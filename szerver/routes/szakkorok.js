// =====================================================
// Szakkörök – a záró projekt (20. feladat) API-ja, három szerepkörrel
//
//   Végpont                                   Ki?                  Megjegyzés
//   GET    /api/szakkorok                     bejelentkezve        letszam, tanar, jelentkeztem mezőkkel
//   GET    /api/szakkorok/:id                 bejelentkezve
//   POST   /api/szakkorok                     tanar, admin         tanárnál a tanar_id ő maga, adminnál kötelező
//   PUT    /api/szakkorok/:id                 tanar (SAJÁT), admin 403, ha más tanár szakköre
//   DELETE /api/szakkorok/:id                 admin                a jelentkezések is törlődnek
//   GET    /api/szakkorok/:id/resztvevok      tanar (SAJÁT), admin
//   POST   /api/szakkorok/:id/jelentkezes     diak                 409: már jelentkezett / betelt
//   DELETE /api/szakkorok/:id/jelentkezes     diak                 404: nem is volt jelentkezve
// =====================================================
import { Router } from 'express';
import { betolt, ment, kovetkezoId } from '../jsonDb.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorize } from '../middleware/authorize.js';
import { felhasznalok } from './auth.js';

const router = Router();
const szakkorok = betolt('szakkorok');
const jelentkezesek = betolt('jelentkezesek');

const NAPOK = ['hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek'];

router.use(authenticate);

function kiegeszit(sz, userId) {
  const sajat = jelentkezesek.filter((j) => j.szakkor_id === sz.id);
  return {
    ...sz,
    tanar: felhasznalok.find((f) => f.id === sz.tanar_id)?.nev ?? '?',
    letszam: sajat.length,
    jelentkeztem: sajat.some((j) => j.diak_id === userId),
  };
}

function keres(req, res) {
  const sz = szakkorok.find((s) => s.id === Number(req.params.id));
  if (!sz) res.status(404).json({ hiba: 'Nincs ilyen szakkör.' });
  return sz;
}

// Tanár csak a saját szakkörét kezelheti, admin bármelyiket
function kezelheti(req, sz) {
  return req.user.role === 'admin' || (req.user.role === 'tanar' && sz.tanar_id === req.user.id);
}

function ellenoriz(a) {
  const hibak = [];
  if (typeof a.nev !== 'string' || a.nev.trim().length < 3) hibak.push('A név legalább 3 karakter legyen.');
  if (typeof a.leiras !== 'string') hibak.push('A leírás szöveg legyen.');
  if (!NAPOK.includes(a.nap)) hibak.push(`A nap ezek egyike legyen: ${NAPOK.join(', ')}.`);
  if (typeof a.idopont !== 'string' || !/^([01]\d|2[0-3]):[0-5]\d$/.test(a.idopont)) hibak.push('Az időpont ÓÓ:PP formátumú legyen.');
  if (!Number.isInteger(a.max_letszam) || a.max_letszam < 1 || a.max_letszam > 50) hibak.push('A max. létszám 1 és 50 közötti egész szám legyen.');
  return hibak;
}

const adatok = (a) => ({ nev: a.nev.trim(), leiras: a.leiras.trim(), nap: a.nap, idopont: a.idopont, max_letszam: a.max_letszam });

router.get('/', (req, res) => {
  res.json(szakkorok.map((sz) => kiegeszit(sz, req.user.id)));
});

router.get('/:id', (req, res) => {
  const sz = keres(req, res);
  if (sz) res.json(kiegeszit(sz, req.user.id));
});

router.post('/', authorize('tanar', 'admin'), (req, res) => {
  const hibak = ellenoriz(req.body);
  let tanar_id = req.user.id;
  if (req.user.role === 'admin') {
    tanar_id = req.body.tanar_id;
    if (!felhasznalok.some((f) => f.id === tanar_id && f.szerepkor === 'tanar')) hibak.push('Válassz egy tanárt (tanar_id).');
  }
  if (hibak.length > 0) return res.status(400).json({ hibak });

  const uj = { id: kovetkezoId(szakkorok), ...adatok(req.body), tanar_id };
  szakkorok.push(uj);
  ment('szakkorok', szakkorok);
  res.status(201).json(kiegeszit(uj, req.user.id));
});

router.put('/:id', authorize('tanar', 'admin'), (req, res) => {
  const sz = keres(req, res);
  if (!sz) return;
  if (!kezelheti(req, sz)) return res.status(403).json({ hiba: 'Csak a saját szakkörödet módosíthatod.' });

  const hibak = ellenoriz(req.body);
  const letszam = jelentkezesek.filter((j) => j.szakkor_id === sz.id).length;
  if (Number.isInteger(req.body.max_letszam) && req.body.max_letszam < letszam) {
    hibak.push(`A max. létszám nem lehet kevesebb a jelenlegi létszámnál (${letszam}).`);
  }
  if (hibak.length > 0) return res.status(400).json({ hibak });

  Object.assign(sz, adatok(req.body));
  ment('szakkorok', szakkorok);
  res.json(kiegeszit(sz, req.user.id));
});

router.delete('/:id', authorize('admin'), (req, res) => {
  const sz = keres(req, res);
  if (!sz) return;
  szakkorok.splice(szakkorok.indexOf(sz), 1);
  for (let i = jelentkezesek.length - 1; i >= 0; i--) {
    if (jelentkezesek[i].szakkor_id === sz.id) jelentkezesek.splice(i, 1);
  }
  ment('szakkorok', szakkorok);
  ment('jelentkezesek', jelentkezesek);
  res.sendStatus(204);
});

router.get('/:id/resztvevok', authorize('tanar', 'admin'), (req, res) => {
  const sz = keres(req, res);
  if (!sz) return;
  if (!kezelheti(req, sz)) return res.status(403).json({ hiba: 'Csak a saját szakköröd résztvevőit láthatod.' });

  const lista = jelentkezesek
    .filter((j) => j.szakkor_id === sz.id)
    .map((j) => {
      const d = felhasznalok.find((f) => f.id === j.diak_id);
      return { id: j.diak_id, nev: d?.nev ?? '?', email: d?.email ?? '', datum: j.datum };
    });
  res.json(lista);
});

router.post('/:id/jelentkezes', authorize('diak'), (req, res) => {
  const sz = keres(req, res);
  if (!sz) return;
  const sajat = jelentkezesek.filter((j) => j.szakkor_id === sz.id);
  if (sajat.some((j) => j.diak_id === req.user.id)) return res.status(409).json({ hiba: 'Már jelentkeztél erre a szakkörre.' });
  if (sajat.length >= sz.max_letszam) return res.status(409).json({ hiba: 'A szakkör betelt.' });

  jelentkezesek.push({
    id: kovetkezoId(jelentkezesek),
    szakkor_id: sz.id,
    diak_id: req.user.id,
    datum: new Date().toISOString().slice(0, 10),
  });
  ment('jelentkezesek', jelentkezesek);
  res.status(201).json(kiegeszit(sz, req.user.id));
});

router.delete('/:id/jelentkezes', authorize('diak'), (req, res) => {
  const sz = keres(req, res);
  if (!sz) return;
  const index = jelentkezesek.findIndex((j) => j.szakkor_id === sz.id && j.diak_id === req.user.id);
  if (index === -1) return res.status(404).json({ hiba: 'Nem vagy jelentkezve erre a szakkörre.' });
  jelentkezesek.splice(index, 1);
  ment('jelentkezesek', jelentkezesek);
  res.sendStatus(204);
});

export default router;

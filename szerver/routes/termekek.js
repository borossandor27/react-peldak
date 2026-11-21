// =====================================================
// Termékek – NYILVÁNOS CRUD (nem kell bejelentkezni)
//   GET    /api/termekek            ?kereses=...&kategoria=...
//   GET    /api/termekek/:id
//   POST   /api/termekek            { nev, kategoria, ar, keszlet, leiras? }  -> 201
//   PUT    /api/termekek/:id        teljes csere                              -> 200
//   DELETE /api/termekek/:id                                                  -> 204
// Hibás adatnál: 400 { hibak: [...] }, nem létező id: 404 { hiba }
// =====================================================
import { Router } from 'express';
import { betolt, ment, kovetkezoId } from '../jsonDb.js';

const router = Router();
const termekek = betolt('termekek');

function ellenoriz(a) {
  const hibak = [];
  if (typeof a.nev !== 'string' || a.nev.trim().length < 2) hibak.push('A név legalább 2 karakter legyen.');
  if (typeof a.kategoria !== 'string' || a.kategoria.trim() === '') hibak.push('A kategória kötelező.');
  if (!Number.isInteger(a.ar) || a.ar < 0) hibak.push('Az ár nem negatív egész szám legyen.');
  if (!Number.isInteger(a.keszlet) || a.keszlet < 0) hibak.push('A készlet nem negatív egész szám legyen.');
  if (a.leiras !== undefined && typeof a.leiras !== 'string') hibak.push('A leírás szöveg legyen.');
  return hibak;
}

function tisztit(a) {
  return {
    nev: a.nev.trim(),
    kategoria: a.kategoria.trim().toLowerCase(),
    ar: a.ar,
    keszlet: a.keszlet,
    leiras: (a.leiras ?? '').trim(),
  };
}

router.get('/', (req, res) => {
  let lista = termekek;
  const { kereses, kategoria } = req.query;
  if (kereses) lista = lista.filter((t) => t.nev.toLowerCase().includes(String(kereses).toLowerCase()));
  if (kategoria) lista = lista.filter((t) => t.kategoria === String(kategoria).toLowerCase());
  res.json(lista);
});

router.get('/:id', (req, res) => {
  const t = termekek.find((t) => t.id === Number(req.params.id));
  if (!t) return res.status(404).json({ hiba: 'Nincs ilyen termék.' });
  res.json(t);
});

router.post('/', (req, res) => {
  const hibak = ellenoriz(req.body);
  if (hibak.length > 0) return res.status(400).json({ hibak });
  const uj = { id: kovetkezoId(termekek), ...tisztit(req.body) };
  termekek.push(uj);
  ment('termekek', termekek);
  res.status(201).json(uj);
});

router.put('/:id', (req, res) => {
  const index = termekek.findIndex((t) => t.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ hiba: 'Nincs ilyen termék.' });
  const hibak = ellenoriz(req.body);
  if (hibak.length > 0) return res.status(400).json({ hibak });
  termekek[index] = { id: termekek[index].id, ...tisztit(req.body) };
  ment('termekek', termekek);
  res.json(termekek[index]);
});

router.delete('/:id', (req, res) => {
  const index = termekek.findIndex((t) => t.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ hiba: 'Nincs ilyen termék.' });
  termekek.splice(index, 1);
  ment('termekek', termekek);
  res.sendStatus(204);
});

export default router;

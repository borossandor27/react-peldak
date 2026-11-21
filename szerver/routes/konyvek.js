// =====================================================
// Könyvtár – szerepkör-alapú jogosultságokkal (mint a backend 09-authorization)
//   GET    /api/szerzok          bejelentkezve
//   GET    /api/konyvek          bejelentkezve
//   GET    /api/konyvek/:id      bejelentkezve
//   POST   /api/konyvek          librarian, admin   { cim, szerzo_id, ev }
//   PUT    /api/konyvek/:id      librarian, admin   { cim, szerzo_id, ev, kiolcsonozve }
//   DELETE /api/konyvek/:id      admin              409, ha ki van kölcsönözve
// =====================================================
import { Router } from 'express';
import { betolt, ment, kovetkezoId } from '../jsonDb.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorize } from '../middleware/authorize.js';

export const szerzokRouter = Router();
const router = Router();

const szerzok = betolt('szerzok');
const konyvek = betolt('konyvek');

// A válaszba a szerző nevét is betesszük (mint egy JOIN)
const kiegeszit = (k) => ({ ...k, szerzo: szerzok.find((s) => s.id === k.szerzo_id)?.nev ?? '?' });

szerzokRouter.get('/', authenticate, (req, res) => res.json(szerzok));

function ellenoriz(a) {
  const hibak = [];
  if (typeof a.cim !== 'string' || a.cim.trim() === '') hibak.push('A cím kötelező.');
  if (!szerzok.some((s) => s.id === a.szerzo_id)) hibak.push('Nincs ilyen szerző (szerzo_id).');
  if (!Number.isInteger(a.ev) || a.ev > new Date().getFullYear()) hibak.push('Az év érvényes egész szám legyen.');
  return hibak;
}

router.get('/', authenticate, (req, res) => res.json(konyvek.map(kiegeszit)));

router.get('/:id', authenticate, (req, res) => {
  const k = konyvek.find((k) => k.id === Number(req.params.id));
  if (!k) return res.status(404).json({ hiba: 'Nincs ilyen könyv.' });
  res.json(kiegeszit(k));
});

router.post('/', authenticate, authorize('librarian', 'admin'), (req, res) => {
  const hibak = ellenoriz(req.body);
  if (hibak.length > 0) return res.status(400).json({ hibak });
  const uj = {
    id: kovetkezoId(konyvek),
    cim: req.body.cim.trim(),
    szerzo_id: req.body.szerzo_id,
    ev: req.body.ev,
    kiolcsonozve: false,
  };
  konyvek.push(uj);
  ment('konyvek', konyvek);
  res.status(201).json(kiegeszit(uj));
});

router.put('/:id', authenticate, authorize('librarian', 'admin'), (req, res) => {
  const k = konyvek.find((k) => k.id === Number(req.params.id));
  if (!k) return res.status(404).json({ hiba: 'Nincs ilyen könyv.' });
  const hibak = ellenoriz(req.body);
  if (typeof req.body.kiolcsonozve !== 'boolean') hibak.push('A kiolcsonozve logikai érték legyen.');
  if (hibak.length > 0) return res.status(400).json({ hibak });
  Object.assign(k, {
    cim: req.body.cim.trim(),
    szerzo_id: req.body.szerzo_id,
    ev: req.body.ev,
    kiolcsonozve: req.body.kiolcsonozve,
  });
  ment('konyvek', konyvek);
  res.json(kiegeszit(k));
});

router.delete('/:id', authenticate, authorize('admin'), (req, res) => {
  const index = konyvek.findIndex((k) => k.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ hiba: 'Nincs ilyen könyv.' });
  if (konyvek[index].kiolcsonozve) return res.status(409).json({ hiba: 'Kikölcsönzött könyv nem törölhető.' });
  konyvek.splice(index, 1);
  ment('konyvek', konyvek);
  res.sendStatus(204);
});

export default router;

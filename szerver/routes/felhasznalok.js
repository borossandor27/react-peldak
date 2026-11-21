// =====================================================
// Felhasználók kezelése – CSAK ADMIN
//   GET    /api/felhasznalok               ?szerepkor=tanar
//   PATCH  /api/felhasznalok/:id/szerepkor { szerepkor }
//   DELETE /api/felhasznalok/:id
// A saját szerepkörét / fiókját az admin nem módosíthatja (400).
// =====================================================
import { Router } from 'express';
import { ment } from '../jsonDb.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorize } from '../middleware/authorize.js';
import { felhasznalok, nyilvanos } from './auth.js';

export const SZEREPKOROK = ['user', 'librarian', 'diak', 'tanar', 'admin'];

const router = Router();
router.use(authenticate, authorize('admin'));

router.get('/', (req, res) => {
  let lista = felhasznalok;
  if (req.query.szerepkor) lista = lista.filter((f) => f.szerepkor === req.query.szerepkor);
  res.json(lista.map(nyilvanos));
});

router.patch('/:id/szerepkor', (req, res) => {
  const f = felhasznalok.find((f) => f.id === Number(req.params.id));
  if (!f) return res.status(404).json({ hiba: 'Nincs ilyen felhasználó.' });
  if (!SZEREPKOROK.includes(req.body.szerepkor)) {
    return res.status(400).json({ hiba: `A szerepkör ezek egyike lehet: ${SZEREPKOROK.join(', ')}` });
  }
  if (f.id === req.user.id) return res.status(400).json({ hiba: 'A saját szerepkörödet nem módosíthatod.' });
  f.szerepkor = req.body.szerepkor;
  ment('felhasznalok', felhasznalok);
  res.json(nyilvanos(f));
});

router.delete('/:id', (req, res) => {
  const index = felhasznalok.findIndex((f) => f.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ hiba: 'Nincs ilyen felhasználó.' });
  if (felhasznalok[index].id === req.user.id) return res.status(400).json({ hiba: 'Saját magadat nem törölheted.' });
  felhasznalok.splice(index, 1);
  ment('felhasznalok', felhasznalok);
  res.sendStatus(204);
});

export default router;

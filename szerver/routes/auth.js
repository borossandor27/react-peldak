// =====================================================
// Hitelesítés (ugyanaz a felépítés, mint a backend 09-authorization példájában)
//   POST /api/auth/regisztracio   { nev, email, jelszo }  -> 201, szerepkör: user
//   POST /api/auth/bejelentkezes  { email, jelszo }        -> { token, felhasznalo }
//   GET  /api/auth/en             (token kell)             -> a bejelentkezett felhasználó
// =====================================================
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { betolt, ment, kovetkezoId } from '../jsonDb.js';
import { authenticate } from '../middleware/authenticate.js';
import { JWT_SECRET, JWT_LEJARAT } from '../config.js';

const router = Router();
export const felhasznalok = betolt('felhasznalok');

// A jelszó-hash soha nem megy ki a kliensnek
export const nyilvanos = ({ jelszo_hash, ...f }) => f;

router.post('/regisztracio', async (req, res) => {
  const { nev, email, jelszo } = req.body;
  const hibak = [];
  if (typeof nev !== 'string' || nev.trim() === '') hibak.push('A név kötelező.');
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) hibak.push('Érvénytelen e-mail cím.');
  if (typeof jelszo !== 'string' || jelszo.length < 8) hibak.push('A jelszó legalább 8 karakter legyen.');
  if (hibak.length > 0) return res.status(400).json({ hibak });

  if (felhasznalok.some((f) => f.email === email.toLowerCase())) {
    return res.status(409).json({ hiba: 'Ezzel az e-mail címmel már regisztráltak.' });
  }

  // A szerepkört NEM a kliens választja: mindenki "user"-ként kezd.
  const uj = {
    id: kovetkezoId(felhasznalok),
    nev: nev.trim(),
    email: email.toLowerCase(),
    jelszo_hash: await bcrypt.hash(jelszo, 10),
    szerepkor: 'user',
  };
  felhasznalok.push(uj);
  ment('felhasznalok', felhasznalok);
  res.status(201).json(nyilvanos(uj));
});

router.post('/bejelentkezes', async (req, res) => {
  const { email, jelszo } = req.body;
  if (typeof email !== 'string' || typeof jelszo !== 'string') {
    return res.status(400).json({ hiba: 'Az e-mail és a jelszó kötelező.' });
  }
  const f = felhasznalok.find((f) => f.email === email.toLowerCase());
  if (!f || !(await bcrypt.compare(jelszo, f.jelszo_hash))) {
    return res.status(401).json({ hiba: 'Hibás e-mail cím vagy jelszó.' });
  }
  const token = jwt.sign({ id: f.id, role: f.szerepkor }, JWT_SECRET, { expiresIn: JWT_LEJARAT });
  res.json({ token, felhasznalo: nyilvanos(f) });
});

router.get('/en', authenticate, (req, res) => {
  const f = felhasznalok.find((f) => f.id === req.user.id);
  if (!f) return res.status(401).json({ hiba: 'A felhasználó már nem létezik.' });
  res.json({ ...nyilvanos(f), szerepkorATokenben: req.user.role });
});

export default router;

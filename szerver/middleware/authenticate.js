import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

// "Ki vagy?" – Authorization: Bearer <token> fejléc ellenőrzése, különben 401
export function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ hiba: 'Hiányzó token!' });

  try {
    const adatok = jwt.verify(token, JWT_SECRET);
    req.user = { id: adatok.id, role: adatok.role };
    next();
  } catch {
    res.status(401).json({ hiba: 'Érvénytelen vagy lejárt token!' });
  }
}

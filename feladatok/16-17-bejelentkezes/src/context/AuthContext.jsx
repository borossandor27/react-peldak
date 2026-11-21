// =====================================================
// 16-17. feladat - AuthContext (mintapélda: 10-bejelentkezes)
//
// A useAuth() ezt adja:
//   felhasznalo                          null, ha nincs bejelentkezve
//   bejelentkezes(email, jelszo, emlekezz)   POST /api/auth/bejelentkezes
//   regisztracio({ nev, email, jelszo })     17. feladat: POST /api/auth/regisztracio, utána automatikus belépés
//   kijelentkezes(uzenet?)
//   apiKeres(url, opciok)                tokenes kérés; 401 esetén kijelentkeztet ezzel az üzenettel:
//                                        "A munkamenet lejárt, jelentkezz be újra."  (17. feladat)
//   uzenet, uzenetTorles()               a fenti üzenet (a bejelentkező oldal mutatja)
//
// "Maradjak bejelentkezve" (emlekezz): ha be van pipálva, localStorage-ba ments,
// különben sessionStorage-ba (az a böngészőfül bezárásakor törlődik).
// =====================================================
import { createContext, useContext, useState } from 'react';
import { keres } from '../api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null); // { token, felhasznalo }

  // TODO

  const ertek = { felhasznalo: auth?.felhasznalo ?? null, keres };
  return <AuthContext value={ertek}>{children}</AuthContext>;
}

export function useAuth() {
  const ertek = useContext(AuthContext);
  if (!ertek) throw new Error('A useAuth csak az <AuthProvider> belsejében használható!');
  return ertek;
}

// =====================================================
// AuthContext: ki van bejelentkezve? + bejelentkezés, kijelentkezés, tokenes kérés
//
//   const { felhasznalo, bejelentkezes, kijelentkezes, apiKeres } = useAuth();
//
// A token és a felhasználó a localStorage-ba is bekerül, így oldalfrissítés után
// sem kell újra bejelentkezni (amíg a token le nem jár).
// =====================================================
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { keres } from '../api.js';

const AuthContext = createContext(null);
const KULCS = 'auth'; // localStorage kulcs

function betoltes() {
  try {
    return JSON.parse(localStorage.getItem(KULCS)); // { token, felhasznalo } vagy null
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(betoltes);

  // Minden változáskor mentjük / töröljük
  useEffect(() => {
    if (auth) localStorage.setItem(KULCS, JSON.stringify(auth));
    else localStorage.removeItem(KULCS);
  }, [auth]);

  async function bejelentkezes(email, jelszo) {
    // Hibás adatnál a keres() kivételt dob (401) -> a Bejelentkezes oldal kiírja
    const adat = await keres('/api/auth/bejelentkezes', { method: 'POST', body: { email, jelszo } });
    setAuth(adat);
    return adat.felhasznalo;
  }

  function kijelentkezes() {
    setAuth(null);
  }

  const token = auth?.token;

  // Tokenes kérés. Ha a szerver 401-et ad (lejárt / érvénytelen token), kijelentkeztetünk.
  // useCallback: ugyanazt a függvényt adja vissza, amíg a token nem változik ->
  // nyugodtan betehető a useEffect függőségei közé, nem okoz végtelen ciklust.
  const apiKeres = useCallback(
    async (url, opciok = {}) => {
      try {
        return await keres(url, { ...opciok, token });
      } catch (err) {
        if (err.status === 401) setAuth(null);
        throw err;
      }
    },
    [token]
  );

  const ertek = { felhasznalo: auth?.felhasznalo ?? null, token, bejelentkezes, kijelentkezes, apiKeres };
  return <AuthContext value={ertek}>{children}</AuthContext>;
}

export function useAuth() {
  const ertek = useContext(AuthContext);
  if (!ertek) throw new Error('A useAuth csak az <AuthProvider> belsejében használható!');
  return ertek;
}

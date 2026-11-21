// =====================================================
// 12. feladat - KosarContext (mintapélda: 09-context)
//
// A state-ben csak ennyit tárolj: [{ id: 2, db: 1 }, { id: 5, db: 3 }]
// A termék többi adatát (név, ár, kép) a TERMEKEK tömbből keresd ki.
//
// Ezt adja a useKosar():
//   tetelek      [{ ...termek, db, osszeg }]   - a kosár tartalma, megjelenítéshez
//   osszDb       az összes darab (a menüben a kosár ikon mellé)
//   vegosszeg    a termékek ára összesen
//   szallitas    1490 Ft, de 20 000 Ft felett (és üres kosárnál) 0
//   darab(id)    hány darab van az adott termékből a kosárban
//   hozzaad(id)  +1 darab
//   beallit(id, db)  új darabszám; 0 -> kikerül a kosárból; a készletnél több NEM lehet
//   torol(id), urit()
//
// Szorgalmi: a kosár maradjon meg oldalfrissítés után is (localStorage).
// =====================================================
import { createContext, useContext, useState } from 'react';
import { TERMEKEK } from '../termekek.js';

const KosarContext = createContext(null);

export function KosarProvider({ children }) {
  const [elemek, setElemek] = useState([]);

  // TODO

  const ertek = { elemek, TERMEKEK };
  return <KosarContext value={ertek}>{children}</KosarContext>;
}

export function useKosar() {
  const ertek = useContext(KosarContext);
  if (!ertek) throw new Error('A useKosar csak a <KosarProvider> belsejében használható!');
  return ertek;
}

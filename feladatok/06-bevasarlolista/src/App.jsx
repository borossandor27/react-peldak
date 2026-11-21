// =====================================================
// 6. feladat - Bevásárlólista (komponensekre bontva)
// Indítás: npm run f06
// A feladat leírása: feladatok/FELADATOK.md
//
// Javasolt felépítés:
//   App               <- itt a state (tetelek) és a módosító függvények
//   ├── UjTetel       <- név, mennyiség, kategória; onHozzaad(uj)
//   ├── (kategóriánként egy kártya)
//   │     └── Tetel   <- pipa, − / + gomb, törlés; onModosit(id, valtozas), onTorol(id)
//   └── Osszesito     <- statisztika, haladásjelző, "Megvásároltak törlése"
// =====================================================
import { useState } from 'react';
import { KATEGORIAK } from './kategoriak.js';

const KEZDO = [
  { id: 1, nev: 'tej', mennyiseg: 2, kategoria: 'tejtermék', megvett: false },
  { id: 2, nev: 'kenyér', mennyiseg: 1, kategoria: 'pékáru', megvett: true },
  { id: 3, nev: 'alma', mennyiseg: 6, kategoria: 'zöldség-gyümölcs', megvett: false },
];

export default function App() {
  const [tetelek, setTetelek] = useState(KEZDO);

  // TODO: hozzaad(uj) - ha már van ugyanilyen nevű tétel ugyanabban a kategóriában,
  //       csak a mennyiségét növeld (és legyen újra "nem megvett"); különben új tétel
  // TODO: modosit(id, valtozas) - pl. modosit(3, { megvett: true }) vagy modosit(3, { mennyiseg: 5 })
  // TODO: torol(id)
  // TODO: megvettekTorlese()

  return (
    <>
      <h1>🛒 Bevásárlólista</h1>
      {/* TODO: <UjTetel />, kategóriánként csoportosított lista (üres kategória ne jelenjen meg!),
               a kategórián belül a meg nem vettek elöl, ábécérendben; <Osszesito /> */}
      <pre>{JSON.stringify({ tetelek, KATEGORIAK }, null, 2)}</pre>
    </>
  );
}

// =====================================================
// 11. feladat - Receptkönyv routerrel
// Indítás: npm run f11
// A feladat leírása: feladatok/FELADATOK-2.md · Mintapélda: 07-router
//
//   /                 Fooldal         véletlen napi ajánlat
//   /receptek         Receptek        ?kategoria=leves&kereses=tojás&maxIdo=30
//   /receptek/:id     ReceptReszlet   adagszám-váltó, kipipálható lépések
//   *                 NemTalalhato
//
// Hozd létre a components/Elrendezes.jsx és a pages/*.jsx fájlokat!
// =====================================================
import { RECEPTEK } from './receptek.js';

export default function App() {
  // TODO: BrowserRouter, Routes, Route-ok egy közös Elrendezes alatt
  return (
    <ul>
      {RECEPTEK.map((r) => (
        <li key={r.id}>{r.nev}</li>
      ))}
    </ul>
  );
}

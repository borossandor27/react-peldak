// =====================================================
// 12. feladat - Webshop kosárral
// Indítás: npm run f12
// A feladat leírása: feladatok/FELADATOK-2.md · Mintapéldák: 07-router, 09-context
//
//   /               Termekek        kártyák, Kosárba gomb
//   /termekek/:id   TermekReszlet
//   /kosar          Kosar           táblázat, − / + / ✕, összesítés
//   /penztar        Penztar         űrlap -> rendelés leadása
//   /koszonjuk      Koszonjuk       a rendelés adatai (navigate state-tel átadva)
//
// A menüben a kosár ikon mellett piros körben a darabszám.
// =====================================================
import { KosarProvider } from './context/KosarContext.jsx';
import { TERMEKEK, ft } from './termekek.js';

export default function App() {
  // TODO: KosarProvider > BrowserRouter > Routes, közös elrendezés menüvel
  return (
    <KosarProvider>
      <h1>🖥️ TechBolt</h1>
      <ul>
        {TERMEKEK.map((t) => (
          <li key={t.id}>
            {t.kep} {t.nev} – {ft(t.ar)}
          </li>
        ))}
      </ul>
    </KosarProvider>
  );
}

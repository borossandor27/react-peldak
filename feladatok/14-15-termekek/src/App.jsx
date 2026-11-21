// =====================================================
// 14-15. feladat - Termékkezelő (a papírbolt raktárprogramja)
// Indítás KÉT terminálban:  npm run szerver   és   npm run f14
// A feladat leírása: feladatok/FELADATOK-3.md · Mintapélda: 08-api-crud
//
// 14. feladat: minden egy oldalon (lista, keresés, szűrés, új termék, törlés, készlet ±)
// 15. feladat: alakítsd át több oldalra React Routerrel, és készítsd el a szerkesztést (PUT)
//
// Az eredeti adatok visszaállítása: npm run szerver-reset
// =====================================================
import { useEffect, useState } from 'react';
import { termekApi, ft } from './api.js';

export default function App() {
  const [termekek, setTermekek] = useState([]);

  // TODO: betöltés / hiba state-ek
  // TODO: kereső mező -> szerveroldali keresés (?kereses=), 300 ms késleltetéssel (lásd FELADATOK-3.md)
  // TODO: kategória szűrő (a betöltött termékekből), táblázat, készlet − / + (PUT), törlés
  // TODO: új termék űrlap (külön komponens: components/TermekUrlap.jsx), a szerver hibaüzenetei listában

  useEffect(() => {
    termekApi.lista().then(setTermekek);
  }, []);

  return (
    <div className="kartya">
      <h1>📦 Papírbolt – raktár</h1>
      <ul>
        {termekek.map((t) => (
          <li key={t.id}>
            {t.nev} – {ft(t.ar)}
          </li>
        ))}
      </ul>
    </div>
  );
}

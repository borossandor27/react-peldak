// =====================================================
// 9. feladat - Kvíz
// Indítás: npm run f09
// A feladat leírása: feladatok/FELADATOK-2.md
//
// Javasolt felépítés:
//   App                 <- state: a kevert kérdések, a megadott válaszok, az aktuális választás
//   ├── KerdesKartya    <- props: kerdes, valasztott, onValaszt(index)
//   └── Eredmeny        <- props: kerdesek, valaszok, onUjra()
// =====================================================
import { useState } from 'react';
import { KERDESEK } from './kerdesek.js';

// TODO: Fisher–Yates keverés. Új tömböt adjon vissza, az eredetit NE módosítsa!
export function kever(tomb) {
  return tomb;
}

export default function App() {
  // TODO: state-ek
  // Tipp: az "állapot" (kezdés / kérdés / vége) KISZÁMOLHATÓ abból,
  //       hány kérdés van és hány válasz van már - nem kell külön state-be tenni.

  return (
    <div className="kartya">
      <h1>🧠 React kvíz</h1>
      <p>{KERDESEK.length} kérdés vár rád.</p>
      <button>Kezdés</button>
    </div>
  );
}

// =====================================================
// 7. feladat - Filmkereső
// Indítás: npm run f07
// Az adatok: public/filmek.json  ->  fetch('/filmek.json')
// A feladat leírása: feladatok/FELADATOK-2.md
// =====================================================
import { useEffect, useState } from 'react';

export default function App() {
  // TODO: state-ek: filmek, betolt, hiba
  // TODO: state a szűrőknek (kereses, mufaj, min. értékelés, rendezés) - lehet egy objektum is
  // TODO: state a kiválasztott film id-jének

  // TODO: useEffect + fetch('/filmek.json') - betöltés / hiba kezelése (mintapélda: 06)

  // TODO: számított értékek: műfajok listája (Set), szűrt + rendezett találatok, kiválasztott film

  return (
    <>
      <h1>🎬 Filmkereső</h1>
      {/* TODO: szűrő sáv, találatok száma, filmlista, részletes nézet */}
    </>
  );
}

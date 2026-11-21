// =====================================================
// 4. feladat - Átváltó (a backend 3. feladatának React változata)
// Indítás: npm run f04
// A feladat leírása: feladatok/FELADATOK.md
// =====================================================
import { useState } from 'react';

export default function App() {
  return (
    <>
      <h1>Átváltó</h1>
      <Homerseklet />
      <Penzvalto />
      <Bmi />
    </>
  );
}

// ---------- a) Hőmérséklet ----------
// Két mező: °C és °F. Bármelyikbe írsz, a másik azonnal frissüljön (1 tizedesre kerekítve).
// TIPP: ne két state legyen! Elég azt tárolni, amit a felhasználó utoljára beírt:
//       { ertek: '25', egyseg: 'c' }  -> a másik mező értékét számold ki.
// Képletek: F = C · 9/5 + 32,  C = (F − 32) · 5/9
// A mezők mellett jelenjen meg: ≤ 0 °C 🧊 fagy, ≥ 30 °C 🔥 kánikula, ≥ 100 °C ♨️ forr
function Homerseklet() {
  // TODO
  return <div className="kartya">TODO: hőmérséklet</div>;
}

// ---------- b) Pénzváltó ----------
// Forint mező + valuta legördülő (EUR, USD, GBP) -> "10 000 Ft = 25.00 EUR"
// Negatív vagy üres összegnél piros hibaüzenet. Alul az árfolyamok listája.
const ARFOLYAMOK = { eur: 400, usd: 360, gbp: 470 };

function Penzvalto() {
  // TODO
  return <div className="kartya">TODO: pénzváltó {Object.keys(ARFOLYAMOK).join(', ')}</div>;
}

// ---------- c) BMI ----------
// Súly (kg) és magasság (cm) mező. BMI = súly / (magasság méterben)²
// Kategória színesen: < 18,5 sovány, < 25 normál, < 30 túlsúlyos, egyébként elhízott.
// Amíg valamelyik mező üres vagy nem pozitív: "Add meg a súlyodat és a magasságodat."
function Bmi() {
  // TODO
  return <div className="kartya">TODO: BMI</div>;
}

// =====================================================
// 8. feladat - Stopper és visszaszámláló
// Indítás: npm run f08
// A feladat leírása: feladatok/FELADATOK-2.md
// =====================================================
import { useEffect, useState } from 'react';

export default function App() {
  return (
    <>
      <h1>⏱️ Stopper és visszaszámláló</h1>
      <Stopper />
      <Visszaszamlalo />
    </>
  );
}

// TODO: 75300 ms -> "01:15.3"   (perc:másodperc.tized, kétjegyű perc és másodperc: padStart)
export function formaz(ms) {
  return String(ms);
}

function Stopper() {
  // TODO: state: eltelt idő (ms), fut-e, körök listája
  // TODO: useEffect, ami CSAK akkor indít setInterval-t, ha fut; a takarító függvény állítsa le!
  //       Tipp: 100 ms-onként növeld 100-zal (függvényes frissítéssel: setEltelt(e => e + 100))
  // TODO: gombok: Indít / Megállít / Folytat (egy gomb!), Kör, Nullázás
  // TODO: köridők táblázata (#, köridő, összesen), a legjobb kör zölddel
  return <div className="kartya">TODO: stopper {formaz(0)}</div>;
}

function Visszaszamlalo() {
  // TODO: perc és mp beviteli mező, hátralévő idő (mp), fut-e
  // TODO: másodpercenként csökken; 0-nál megáll és "⏰ Lejárt az idő!"
  // TODO: az utolsó 10 másodpercben piros a szám
  // TODO: a böngészőfül címe (document.title) mutassa a hátralévő időt - külön useEffect!
  // TODO: Indít / Szünet / Folytat, Visszaállít
  return <div className="kartya">TODO: visszaszámláló</div>;
}

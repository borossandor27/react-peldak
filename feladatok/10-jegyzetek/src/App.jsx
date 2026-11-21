// =====================================================
// 10. feladat - Jegyzetek (a böngészőben tárolva)
// Indítás: npm run f10
// A feladat leírása: feladatok/FELADATOK-2.md
//
// Egy jegyzet: { id, cim, szoveg, szin, kituzve, letrehozva, modositva }
//
// Javasolt felépítés:
//   App               <- jegyzetek (useLocalStorage!), keresés, épp szerkesztett jegyzet id-je
//   ├── JegyzetUrlap  <- ÚJ jegyzethez ÉS szerkesztéshez is (props: kezdo?, gombFelirat, onMentes, onMegse?)
//   └── JegyzetKartya <- props: jegyzet, onKituz, onSzerkeszt, onTorol
// =====================================================
import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage.js';

export const SZINEK = ['#fef3c7', '#dcfce7', '#dbeafe', '#fce7f3', '#f3f4f6'];

export default function App() {
  const [jegyzetek, setJegyzetek] = useLocalStorage('jegyzetek', []);

  // TODO

  return (
    <>
      <h1>🗒️ Jegyzetek</h1>
      <p className="halvany">{jegyzetek.length} jegyzet</p>
    </>
  );
}

// =====================================================
// 3. feladat - Számláló és dobókocka
// Indítás: npm run f03
// A feladat leírása: feladatok/FELADATOK.md
// =====================================================
import { useState } from 'react';

export default function App() {
  return (
    <>
      <h1>Számláló és dobókocka</h1>
      <Szamlalo />
      <Dobokocka />
    </>
  );
}

const MIN = 0;
const MAX = 20;

function Szamlalo() {
  // TODO: state az értéknek és a lépésköznek (1, 2 vagy 5)

  // TODO: a lépésköz-választó gombok (az aktív gomb kitöltött, a többi "masodlagos" osztályú)
  // TODO: −lépés / +lépés gombok: az érték ne menjen MIN alá és MAX fölé, a határon a gomb legyen letiltva
  // TODO: Nullázás gomb
  // TODO: maximumnál piros szám és "Elérted a maximumot!" üzenet
  return <div className="kartya">TODO: számláló</div>;
}

const LAPOK = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

function Dobokocka() {
  // TODO: a dobások tömbje a state-ben (a legutóbbi elöl)

  // TODO: Dobás gomb -> 1..6 véletlen szám (Math.random), a kocka lapja nagy betűmérettel (LAPOK)
  // TODO: Új játék gomb -> törli a dobásokat
  // TODO: statisztika: dobások száma, összeg, átlag 2 tizedesre, hatosok száma
  // TODO: az utolsó 10 dobás vesszővel elválasztva; ha az utolsó hatos: "🎉 Hatos!"
  // Figyelj: mindezt a dobások tömbjéből SZÁMOLD, ne tárold külön state-ben!
  return <div className="kartya">TODO: dobókocka {LAPOK[5]}</div>;
}

// =====================================================
// 03 - State (useState) és eseménykezelés
// Indítás: npm run 03
//
// A sima változó NEM elég: ha megváltozik, a React nem tudja, hogy újra kell rajzolni.
// A useState olyan változót ad, amelynek módosításakor a komponens ÚJRARENDERELŐDIK.
//
//   const [ertek, setErtek] = useState(kezdoErtek);
// =====================================================
import { useState } from 'react';

export default function App() {
  return (
    <>
      <h1>State és események</h1>
      <Szamlalo />
      <Kapcsolo />
      <Profil />
      <Gyumolcsok />
    </>
  );
}

// ---------- 1. Szám a state-ben ----------
function Szamlalo() {
  const [szam, setSzam] = useState(0);

  // Eseménykezelő függvény: a komponensen belül, hogy lássa a state-et
  function novel() {
    setSzam(szam + 1);
  }

  // Ha az új érték az ELŐZŐBŐL számolódik, biztosabb a "függvényes" forma:
  function novelHarommal() {
    // setSzam(szam + 1) háromszor egymás után csak +1 lenne! (a szam mindhárom sorban ugyanaz)
    setSzam((elozo) => elozo + 1);
    setSzam((elozo) => elozo + 1);
    setSzam((elozo) => elozo + 1);
  }

  return (
    <div className="kartya">
      <h2>Számláló: {szam}</h2>
      {/* onClick-nek a FÜGGVÉNYT adjuk át, nem hívjuk meg: onClick={novel}, NEM onClick={novel()} */}
      <button onClick={novel}>+1</button>{' '}
      <button onClick={novelHarommal}>+3</button>{' '}
      {/* Paraméteres hívásnál nyílfüggvénybe csomagoljuk */}
      <button onClick={() => setSzam(szam - 1)} disabled={szam <= 0}>
        −1
      </button>{' '}
      <button className="masodlagos" onClick={() => setSzam(0)}>
        Nullázás
      </button>
    </div>
  );
}

// ---------- 2. Logikai érték (be/ki kapcsolás) ----------
function Kapcsolo() {
  const [lathato, setLathato] = useState(false);

  return (
    <div className="kartya">
      <button onClick={() => setLathato(!lathato)}>{lathato ? 'Elrejtés' : 'Mutasd a titkot'}</button>
      {lathato && <p>🤫 A React a komponenst újra lefuttatja minden state-változáskor.</p>}
    </div>
  );
}

// ---------- 3. Objektum a state-ben ----------
function Profil() {
  const [profil, setProfil] = useState({ nev: 'Anna', pont: 10, szint: 1 });

  function pontotKap() {
    // A state-et SOHA ne módosítsd közvetlenül (profil.pont++ HIBÁS)!
    // Új objektumot kell készíteni: a ... (spread) lemásolja a többi mezőt.
    const ujPont = profil.pont + 15;
    setProfil({ ...profil, pont: ujPont, szint: Math.floor(ujPont / 50) + 1 });
  }

  return (
    <div className="kartya">
      <h2>
        {profil.nev} – {profil.pont} pont, {profil.szint}. szint
      </h2>
      <button onClick={pontotKap}>+15 pont</button>
    </div>
  );
}

// ---------- 4. Tömb a state-ben ----------
function Gyumolcsok() {
  const [lista, setLista] = useState(['alma', 'körte']);
  const KINALAT = ['szilva', 'barack', 'eper', 'dinnye', 'meggy'];

  // Hozzáadás: új tömb a régi elemekkel + az új elem (NEM push!)
  function hozzaad() {
    const veletlen = KINALAT[Math.floor(Math.random() * KINALAT.length)];
    setLista([...lista, veletlen]);
  }

  // Törlés: filter -> új tömb a törölt elem nélkül (NEM splice!)
  function torol(index) {
    setLista(lista.filter((_, i) => i !== index));
  }

  return (
    <div className="kartya">
      <h2>Gyümölcskosár ({lista.length})</h2>
      <button onClick={hozzaad}>Véletlen gyümölcs</button>
      <ul>
        {lista.map((gy, i) => (
          // Itt lehetnek ismétlődő nevek, és nincs id -> most kivételesen indexet használunk
          <li key={i}>
            {gy}{' '}
            <button className="masodlagos" onClick={() => torol(i)}>
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

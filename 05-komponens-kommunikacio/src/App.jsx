// =====================================================
// 05 - Komponensek kommunikációja: "state felemelése" (lifting state up)
// Indítás: npm run 05
//
//                 App  (itt van a state: teendok, szuro)
//            /      |        \
//   UjTeendo     Szuro      TeendoLista
//  (onHozzaad) (onValt)    (onValt, onTorol)
//                               |
//                           TeendoElem
//
// Adat LEFELÉ: props.   Esemény FELFELÉ: a szülőtől kapott függvény (callback) meghívása.
// =====================================================
import { useState } from 'react';
import UjTeendo from './components/UjTeendo.jsx';
import Szuro from './components/Szuro.jsx';
import TeendoLista from './components/TeendoLista.jsx';

const KEZDO = [
  { id: 1, szoveg: 'React dokumentáció átolvasása', kesz: true },
  { id: 2, szoveg: 'Gyakorló feladatok megoldása', kesz: false },
  { id: 3, szoveg: 'Vizsgaremek tervezése', kesz: false },
];

export default function App() {
  const [teendok, setTeendok] = useState(KEZDO);
  const [szuro, setSzuro] = useState('mind'); // 'mind' | 'aktiv' | 'kesz'

  // A state-et módosító függvények a state MELLETT vannak, a gyerekek csak meghívják őket
  function hozzaad(szoveg) {
    const uj = { id: Date.now(), szoveg, kesz: false };
    setTeendok([...teendok, uj]);
  }

  function valt(id) {
    setTeendok(teendok.map((t) => (t.id === id ? { ...t, kesz: !t.kesz } : t)));
  }

  function torol(id) {
    setTeendok(teendok.filter((t) => t.id !== id));
  }

  // Számított értékek
  const lathatok = teendok.filter((t) => (szuro === 'aktiv' ? !t.kesz : szuro === 'kesz' ? t.kesz : true));
  const hatralevo = teendok.filter((t) => !t.kesz).length;

  return (
    <>
      <h1>Teendőlista</h1>
      <div className="kartya">
        <UjTeendo onHozzaad={hozzaad} />
        <Szuro aktualis={szuro} onValt={setSzuro} />
        <TeendoLista teendok={lathatok} onValt={valt} onTorol={torol} />
        <p className="halvany">Hátralévő: {hatralevo} db</p>
      </div>
    </>
  );
}

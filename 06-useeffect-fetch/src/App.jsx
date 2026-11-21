// =====================================================
// 06 - useEffect: mellékhatások (adatbetöltés, időzítő, localStorage, document.title)
// Indítás: npm run 06
//
//   useEffect(() => { ...mellékhatás...; return () => { ...takarítás... } }, [függőségek]);
//
//   []          -> csak egyszer fut le, az első megjelenéskor
//   [a, b]      -> akkor fut újra, ha a vagy b megváltozott
//   (nincs)     -> MINDEN renderelés után lefut (ritkán kell!)
// =====================================================
import { useEffect, useState } from 'react';

export default function App() {
  const [oraLathato, setOraLathato] = useState(true);

  return (
    <>
      <h1>useEffect és fetch</h1>
      <div className="kartya">
        <button onClick={() => setOraLathato(!oraLathato)}>{oraLathato ? 'Óra elrejtése' : 'Óra mutatása'}</button>
        {oraLathato && <Ora />}
      </div>
      <Varosok />
      <Jegyzet />
    </>
  );
}

// ---------- 1. Időzítő + takarítás (cleanup) ----------
function Ora() {
  const [most, setMost] = useState(new Date());

  useEffect(() => {
    console.log('Óra: időzítő indul');
    const azonosito = setInterval(() => setMost(new Date()), 1000);

    // Ha az Óra eltűnik az oldalról, az időzítőt LE KELL ÁLLÍTANI, különben tovább fut
    return () => {
      console.log('Óra: időzítő leáll');
      clearInterval(azonosito);
    };
  }, []);

  return <h2>🕒 {most.toLocaleTimeString('hu-HU')}</h2>;
}

// ---------- 2. Adatbetöltés fetch-csel: betöltés / hiba / adat ----------
function Varosok() {
  const [varosok, setVarosok] = useState([]);
  const [betolt, setBetolt] = useState(true);
  const [hiba, setHiba] = useState(null);
  const [kereses, setKereses] = useState('');

  useEffect(() => {
    // Az effekt függvénye nem lehet async, ezért belül készítünk egy async függvényt
    async function letolt() {
      try {
        // A public/ mappa tartalma a gyökérből érhető el: public/varosok.json -> /varosok.json
        const valasz = await fetch('/varosok.json');
        if (!valasz.ok) throw new Error(`HTTP ${valasz.status}`);
        const adat = await valasz.json();
        setVarosok(adat);
      } catch (err) {
        setHiba(err.message);
      } finally {
        setBetolt(false);
      }
    }
    letolt();
  }, []); // [] -> csak egyszer töltjük le

  // A kiírt cím a keresőmezőtől függ -> külön effekt, a kereses a függősége
  useEffect(() => {
    document.title = kereses ? `Keresés: ${kereses}` : '06 – useEffect és fetch';
  }, [kereses]);

  if (betolt) return <p className="kartya">Betöltés...</p>;
  if (hiba) return <p className="kartya hiba">Hiba történt: {hiba}</p>;

  // Szűrés: számított érték, nem kell hozzá effekt!
  const talalatok = varosok.filter((v) => v.nev.toLowerCase().includes(kereses.toLowerCase()));

  return (
    <div className="kartya">
      <h2>Magyar városok ({talalatok.length})</h2>
      <input placeholder="Keresés..." value={kereses} onChange={(e) => setKereses(e.target.value)} />
      <table>
        <thead>
          <tr>
            <th>Város</th>
            <th>Megye</th>
            <th>Lakosság</th>
          </tr>
        </thead>
        <tbody>
          {talalatok.map((v) => (
            <tr key={v.nev}>
              <td>{v.nev}</td>
              <td>{v.megye}</td>
              <td>{v.lakossag.toLocaleString('hu-HU')} fő</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------- 3. Mentés a böngészőbe (localStorage) ----------
function Jegyzet() {
  // Lusta kezdőérték: a függvény csak az ELSŐ rendereléskor fut le
  const [szoveg, setSzoveg] = useState(() => localStorage.getItem('jegyzet') ?? '');

  // Minden változáskor elmentjük
  useEffect(() => {
    localStorage.setItem('jegyzet', szoveg);
  }, [szoveg]);

  return (
    <div className="kartya">
      <h2>Jegyzet (frissítés után is megmarad)</h2>
      <textarea rows={3} style={{ width: '100%' }} value={szoveg} onChange={(e) => setSzoveg(e.target.value)} />
    </div>
  );
}

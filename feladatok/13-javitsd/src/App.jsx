// =====================================================
// 13. feladat - Javítsd ki!
// Indítás: npm run f13
// A feladat leírása: feladatok/FELADATOK-2.md
//
// Ez az alkalmazás az osztálykirándulás befizetéseit tartja nyilván.
// A kódban 12 tipikus React hiba van. Keresd meg és javítsd mindet!
// Legyen nyitva a konzol (F12) - sok hibára a React figyelmeztet.
// =====================================================
import { useEffect, useState } from 'react';

const CEL = 15000; // Ft / fő

export default function App() {
  const [diakok, setDiakok] = useState([]);
  const [betolt, setBetolt] = useState(true);
  const [csakTartozok, setCsakTartozok] = useState(false);
  const [rendezett, setRendezett] = useState(false);
  const [diakId, setDiakId] = useState('');
  const [osszeg, setOsszeg] = useState('');

  useEffect(() => {
    fetch('/diakok.json')
      .then((r) => r.json())
      .then((adat) => {
        setDiakok(adat);
        setBetolt(false);
      });
  });

  if (betolt) return <p>Betöltés...</p>;

  const [uzenet, setUzenet] = useState('');

  function befizet(e) {
    if (!diakId || !(osszeg > 0)) {
      setUzenet('Válassz diákot, és adj meg pozitív összeget!');
      return;
    }
    setDiakok(diakok.map((d) => (d.id === Number(diakId) ? { ...d, befizetve: d.befizetve + osszeg } : d)));
    setUzenet(`${osszeg} Ft befizetve.`);
    setOsszeg('');
  }

  function nullaz(id) {
    const diak = diakok.find((d) => d.id === id);
    diak.befizetve = 0;
    setDiakok(diakok);
  }

  function torol(id) {
    setDiakok(diakok.filter((d) => d.id !== id));
  }

  let lista = csakTartozok ? diakok.filter((d) => d.befizetve < CEL) : diakok;
  if (rendezett) lista = lista.sort((a, b) => a.nev.localeCompare(b.nev, 'hu'));

  const osszesen = diakok.reduce((s, d) => s + d.befizetve, 0);
  const tartozok = diakok.filter((d) => d.befizetve < CEL);

  return (
    <>
      <h1 class="cim">🚌 Osztálykirándulás – befizetések</h1>
      <Ora />

      <div className="kartya">
        <p>
          Összegyűlt: <b>{osszesen.toLocaleString('hu-HU')} Ft</b> / {(CEL * diakok.length).toLocaleString('hu-HU')} Ft
        </p>
        {tartozok.length && <p className="hiba">Még {tartozok.length} diák tartozik.</p>}
      </div>

      <form className="kartya" onSubmit={befizet}>
        <select value={diakId} onChange={(e) => setDiakId(e.target.value)}>
          <option value="">– diák –</option>
          {diakok.map((d) => (
            <option key={d.id} value={d.id}>
              {d.nev}
            </option>
          ))}
        </select>{' '}
        <input type="number" placeholder="Összeg" value={osszeg} onChange={(e) => setOsszeg(e.target.value)} />{' '}
        <button type="submit">Befizetés</button>
        {uzenet && <p>{uzenet}</p>}
      </form>

      <div className="kartya">
        <label style={{ fontWeight: 400 }}>
          <input type="checkbox" value={csakTartozok} onChange={(e) => setCsakTartozok(e.target.value)} /> Csak a tartozók
        </label>
        <button className="masodlagos" onClick={() => setRendezett(!rendezett)}>
          {rendezett ? 'Eredeti sorrend' : 'Névsorba rendezés'}
        </button>
        <table>
          <tbody>
            {lista.map((d) => (
              <tr>
                <td>{d.nev}</td>
                <td className={d.befizetve >= CEL ? 'siker' : 'hiba'}>{d.befizetve.toLocaleString('hu-HU')} Ft</td>
                <td>
                  <button className="masodlagos" onClick={() => nullaz(d.id)}>
                    Nullázás
                  </button>{' '}
                  <button className="veszely" onClick={torol(d.id)}>
                    Törlés
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Ora() {
  const [mp, setMp] = useState(0);

  useEffect(() => {
    setInterval(() => setMp((m) => m + 1), 1000);
  }, []);

  return <p className="halvany">Az oldal {mp} másodperce van nyitva.</p>;
}

// =====================================================
// 08 - Kommunikáció a backenddel: listázás, létrehozás, törlés
// Indítás: KÉT terminálban!
//   1. npm run szerver   (gyakorló API: http://localhost:3000)
//   2. npm run 08        (React:        http://localhost:5173)
//
//   GET    /api/termekek       -> lista
//   POST   /api/termekek       -> új termék (201), hibás adatnál 400 { hibak: [...] }
//   DELETE /api/termekek/:id   -> törlés (204)
// =====================================================
import { useEffect, useState } from 'react';
import { termekApi } from './api.js';
import TermekUrlap from './components/TermekUrlap.jsx';

export default function App() {
  const [termekek, setTermekek] = useState([]);
  const [betolt, setBetolt] = useState(true);
  const [hiba, setHiba] = useState(null);

  useEffect(() => {
    termekApi
      .lista()
      .then(setTermekek)
      .catch((err) => setHiba(`Nem sikerült betölteni: ${err.message}. Fut a szerver? (npm run szerver)`))
      .finally(() => setBetolt(false));
  }, []);

  // A szervertől visszakapott (már id-vel rendelkező) terméket tesszük a listába
  async function hozzaad(adat) {
    const uj = await termekApi.uj(adat); // hiba esetén kivételt dob -> az űrlap kezeli
    setTermekek([...termekek, uj]);
  }

  async function torol(t) {
    if (!confirm(`Biztosan törlöd: ${t.nev}?`)) return;
    try {
      await termekApi.torol(t.id);
      setTermekek(termekek.filter((x) => x.id !== t.id));
    } catch (err) {
      alert(`Törlés sikertelen: ${err.message}`);
    }
  }

  return (
    <>
      <h1>Papírbolt – termékek</h1>
      <TermekUrlap onMentes={hozzaad} />

      <div className="kartya">
        {betolt && <p>Betöltés...</p>}
        {hiba && <p className="hiba">{hiba}</p>}
        {!betolt && !hiba && (
          <table>
            <thead>
              <tr>
                <th>Név</th>
                <th>Kategória</th>
                <th>Ár</th>
                <th>Készlet</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {termekek.map((t) => (
                <tr key={t.id}>
                  <td>{t.nev}</td>
                  <td>{t.kategoria}</td>
                  <td>{t.ar.toLocaleString('hu-HU')} Ft</td>
                  <td className={t.keszlet === 0 ? 'hiba' : ''}>{t.keszlet === 0 ? 'elfogyott' : `${t.keszlet} db`}</td>
                  <td>
                    <button className="veszely" onClick={() => torol(t)}>
                      Törlés
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

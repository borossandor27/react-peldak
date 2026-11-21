// Könyvek oldal - ugyanaz az oldal, szerepkörtől függően más lehetőségekkel:
//   user       -> csak lista
//   librarian  -> + új könyv felvétele
//   admin      -> + törlés
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import Jogosult from '../components/Jogosult.jsx';

export default function Konyvek() {
  const { apiKeres } = useAuth();
  const [konyvek, setKonyvek] = useState(null);
  const [szerzok, setSzerzok] = useState([]);
  const [hiba, setHiba] = useState(null);

  useEffect(() => {
    // Két kérés párhuzamosan: Promise.all megvárja mindkettőt
    Promise.all([apiKeres('/api/konyvek'), apiKeres('/api/szerzok')])
      .then(([k, sz]) => {
        setKonyvek(k);
        setSzerzok(sz);
      })
      .catch((err) => setHiba(err.message));
  }, [apiKeres]);

  async function torol(k) {
    if (!confirm(`Törlöd: ${k.cim}?`)) return;
    try {
      await apiKeres(`/api/konyvek/${k.id}`, { method: 'DELETE' });
      setKonyvek(konyvek.filter((x) => x.id !== k.id));
    } catch (err) {
      // 403: nincs jog (ha valahogy mégis megjelent a gomb), 409: kikölcsönzött könyv
      alert(err.status === 403 ? 'Ehhez nincs jogosultságod.' : err.message);
    }
  }

  if (hiba) return <p className="kartya hiba">{hiba}</p>;
  if (!konyvek) return <p className="kartya">Betöltés...</p>;

  return (
    <>
      <Jogosult jog="konyv:letrehoz">
        <UjKonyv szerzok={szerzok} onUj={(k) => setKonyvek([...konyvek, k])} />
      </Jogosult>

      <div className="kartya">
        <h1>Könyvek</h1>
        <table>
          <thead>
            <tr>
              <th>Cím</th>
              <th>Szerző</th>
              <th>Év</th>
              <th>Állapot</th>
              <Jogosult jog="konyv:torol">
                <th></th>
              </Jogosult>
            </tr>
          </thead>
          <tbody>
            {konyvek.map((k) => (
              <tr key={k.id}>
                <td>{k.cim}</td>
                <td>{k.szerzo}</td>
                <td>{k.ev}</td>
                <td>{k.kiolcsonozve ? '📕 kikölcsönözve' : '📗 elérhető'}</td>
                <Jogosult jog="konyv:torol">
                  <td>
                    <button className="veszely" onClick={() => torol(k)}>
                      Törlés
                    </button>
                  </td>
                </Jogosult>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function UjKonyv({ szerzok, onUj }) {
  const { apiKeres } = useAuth();
  const [adat, setAdat] = useState({ cim: '', szerzo_id: '', ev: '' });
  const [hiba, setHiba] = useState(null);

  const valtozas = (e) => setAdat({ ...adat, [e.target.name]: e.target.value });

  async function bekuld(e) {
    e.preventDefault();
    setHiba(null);
    try {
      const uj = await apiKeres('/api/konyvek', {
        method: 'POST',
        body: { cim: adat.cim, szerzo_id: Number(adat.szerzo_id), ev: Number(adat.ev) },
      });
      onUj(uj);
      setAdat({ cim: '', szerzo_id: '', ev: '' });
    } catch (err) {
      setHiba(err.message);
    }
  }

  return (
    <form className="kartya" onSubmit={bekuld}>
      <h2>Új könyv</h2>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input name="cim" placeholder="Cím" value={adat.cim} onChange={valtozas} />
        <select name="szerzo_id" value={adat.szerzo_id} onChange={valtozas}>
          <option value="">– szerző –</option>
          {szerzok.map((s) => (
            <option key={s.id} value={s.id}>
              {s.nev}
            </option>
          ))}
        </select>
        <input name="ev" type="number" placeholder="Év" value={adat.ev} onChange={valtozas} />
        <button type="submit">Felvétel</button>
      </div>
      {hiba && <p className="hiba">{hiba}</p>}
    </form>
  );
}

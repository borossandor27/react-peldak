// Csak admin: felhasználók listája és szerepkörük módosítása
//   GET   /api/felhasznalok
//   PATCH /api/felhasznalok/:id/szerepkor  { szerepkor }
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { SZEREPKOR_NEVEK } from '../jogok.js';

const VALASZTHATO = ['user', 'librarian', 'admin'];

export default function Felhasznalok() {
  const { apiKeres, felhasznalo: en } = useAuth();
  const [lista, setLista] = useState(null);
  const [hiba, setHiba] = useState(null);
  const [uzenet, setUzenet] = useState(null);

  useEffect(() => {
    apiKeres('/api/felhasznalok')
      .then((f) => setLista(f.filter((x) => VALASZTHATO.includes(x.szerepkor))))
      .catch((err) => setHiba(err.message));
  }, [apiKeres]);

  async function modosit(f, szerepkor) {
    setUzenet(null);
    try {
      const frissitett = await apiKeres(`/api/felhasznalok/${f.id}/szerepkor`, { method: 'PATCH', body: { szerepkor } });
      setLista(lista.map((x) => (x.id === f.id ? frissitett : x)));
      setUzenet(`${f.nev} új szerepköre: ${SZEREPKOR_NEVEK[szerepkor]}. (A változás az ő következő bejelentkezésekor lép életbe!)`);
    } catch (err) {
      setUzenet(err.message);
    }
  }

  if (hiba) return <p className="kartya hiba">{hiba}</p>;
  if (!lista) return <p className="kartya">Betöltés...</p>;

  return (
    <div className="kartya">
      <h1>Felhasználók</h1>
      {uzenet && <p className="siker">{uzenet}</p>}
      <table>
        <thead>
          <tr>
            <th>Név</th>
            <th>E-mail</th>
            <th>Szerepkör</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((f) => (
            <tr key={f.id}>
              <td>{f.nev}</td>
              <td>{f.email}</td>
              <td>
                {/* A saját szerepkörét az admin nem módosíthatja (a szerver is tiltja) */}
                <select value={f.szerepkor} disabled={f.id === en.id} onChange={(e) => modosit(f, e.target.value)}>
                  {VALASZTHATO.map((sz) => (
                    <option key={sz} value={sz}>
                      {SZEREPKOR_NEVEK[sz]}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

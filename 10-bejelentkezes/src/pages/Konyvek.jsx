import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Konyvek() {
  const { apiKeres } = useAuth();
  const [konyvek, setKonyvek] = useState(null);
  const [hiba, setHiba] = useState(null);

  useEffect(() => {
    apiKeres('/api/konyvek')
      .then(setKonyvek)
      .catch((err) => setHiba(err.message));
  }, [apiKeres]);

  if (hiba) return <p className="kartya hiba">{hiba}</p>;
  if (!konyvek) return <p className="kartya">Betöltés...</p>;

  return (
    <div className="kartya">
      <h1>Könyvek</h1>
      <table>
        <thead>
          <tr>
            <th>Cím</th>
            <th>Szerző</th>
            <th>Év</th>
            <th>Állapot</th>
          </tr>
        </thead>
        <tbody>
          {konyvek.map((k) => (
            <tr key={k.id}>
              <td>{k.cim}</td>
              <td>{k.szerzo}</td>
              <td>{k.ev}</td>
              <td>{k.kiolcsonozve ? '📕 kikölcsönözve' : '📗 elérhető'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

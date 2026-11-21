import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Profil() {
  const { apiKeres } = useAuth();
  const [en, setEn] = useState(null);
  const [hiba, setHiba] = useState(null);

  // GET /api/auth/en - a token alapján a szerver mondja meg, ki vagyunk
  useEffect(() => {
    apiKeres('/api/auth/en')
      .then(setEn)
      .catch((err) => setHiba(err.message));
  }, [apiKeres]);

  if (hiba) return <p className="kartya hiba">{hiba}</p>;
  if (!en) return <p className="kartya">Betöltés...</p>;

  return (
    <div className="kartya">
      <h1>Profilom</h1>
      <table>
        <tbody>
          <tr>
            <th>Név</th>
            <td>{en.nev}</td>
          </tr>
          <tr>
            <th>E-mail</th>
            <td>{en.email}</td>
          </tr>
          <tr>
            <th>Szerepkör</th>
            <td>{en.szerepkor}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

import { useParams, useNavigate, Link } from 'react-router';
import { TANTARGYAK } from '../adatok.js';

export default function TantargyReszlet() {
  // Útvonal-paraméter: a "tantargyak/:id" útvonalból az :id értéke - MINDIG szöveg!
  const { id } = useParams();
  const navigate = useNavigate();

  const t = TANTARGYAK.find((t) => t.id === Number(id));

  if (!t) {
    return (
      <div className="kartya">
        <h1>Nincs ilyen tantárgy ({id})</h1>
        <Link to="/tantargyak">Vissza a listához</Link>
      </div>
    );
  }

  return (
    <div className="kartya">
      <h1>{t.nev}</h1>
      <p>{t.leiras}</p>
      <p>
        Évfolyam: {t.evfolyam}. · Heti óraszám: {t.oraszam} · Tanár: {t.tanar}
      </p>
      {/* Navigálás kódból: pl. mentés után, vagy egy "Vissza" gombbal */}
      <button onClick={() => navigate(-1)}>← Vissza</button>{' '}
      <button className="masodlagos" onClick={() => navigate('/')}>
        Főoldal
      </button>
    </div>
  );
}

import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext.jsx';

export default function Bejelentkezes() {
  const { felhasznalo, bejelentkezes } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('olvaso@konyvtar.hu');
  const [jelszo, setJelszo] = useState('');
  const [hiba, setHiba] = useState(null);
  const [kuldes, setKuldes] = useState(false);

  // Ahonnan a VedettUtvonal ideküldött (vagy a főoldal)
  const honnan = location.state?.honnan ?? '/';

  // Aki már be van jelentkezve, annak nincs itt dolga
  if (felhasznalo) return <Navigate to={honnan} replace />;

  async function bekuld(e) {
    e.preventDefault();
    setHiba(null);
    setKuldes(true);
    try {
      await bejelentkezes(email, jelszo);
      navigate(honnan, { replace: true });
    } catch (err) {
      setHiba(err.message);
      setKuldes(false);
    }
  }

  return (
    <form className="kartya" onSubmit={bekuld} style={{ maxWidth: 360 }}>
      <h1>Bejelentkezés</h1>
      <label htmlFor="email">E-mail</label>
      <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
      <label htmlFor="jelszo">Jelszó</label>
      <input id="jelszo" type="password" value={jelszo} onChange={(e) => setJelszo(e.target.value)} autoComplete="current-password" />
      {hiba && <p className="hiba">{hiba}</p>}
      <p>
        <button type="submit" disabled={kuldes}>
          {kuldes ? 'Bejelentkezés...' : 'Belépés'}
        </button>
      </p>
      <p className="halvany">
        <small>Próbafiók: olvaso@konyvtar.hu / Jelszo123</small>
      </p>
    </form>
  );
}

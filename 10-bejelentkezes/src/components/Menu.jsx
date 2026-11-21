import { NavLink, Outlet, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext.jsx';

export default function Menu() {
  const { felhasznalo, kijelentkezes } = useAuth();
  const navigate = useNavigate();

  function kilep() {
    kijelentkezes();
    navigate('/');
  }

  return (
    <>
      <nav>
        <strong>📖 Könyvtár</strong>
        <NavLink to="/" end>
          Főoldal
        </NavLink>
        {/* Feltételes menüpontok: bejelentkezve mást látunk */}
        {felhasznalo && <NavLink to="/konyvek">Könyvek</NavLink>}
        {felhasznalo && <NavLink to="/profil">Profil</NavLink>}
        <span style={{ marginLeft: 'auto' }} />
        {felhasznalo ? (
          <>
            <span>👤 {felhasznalo.nev}</span>
            <button className="masodlagos" onClick={kilep}>
              Kijelentkezés
            </button>
          </>
        ) : (
          <NavLink to="/bejelentkezes">Bejelentkezés</NavLink>
        )}
      </nav>
      <Outlet />
    </>
  );
}

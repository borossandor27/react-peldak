import { NavLink, Outlet, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext.jsx';
import { SZEREPKOR_NEVEK } from '../jogok.js';
import Jogosult from './Jogosult.jsx';

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
        <Jogosult jog="konyv:olvas">
          <NavLink to="/konyvek">Könyvek</NavLink>
        </Jogosult>
        {/* Ezt a menüpontot csak az admin látja */}
        <Jogosult jog="felhasznalo:kezel">
          <NavLink to="/felhasznalok">Felhasználók</NavLink>
        </Jogosult>
        <span style={{ marginLeft: 'auto' }} />
        {felhasznalo ? (
          <>
            <NavLink to="/profil">
              👤 {felhasznalo.nev} ({SZEREPKOR_NEVEK[felhasznalo.szerepkor]})
            </NavLink>
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

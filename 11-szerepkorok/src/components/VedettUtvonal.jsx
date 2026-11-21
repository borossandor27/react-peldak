import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext.jsx';

// <VedettUtvonal />               -> csak bejelentkezve
// <VedettUtvonal jog="xyz" />     -> bejelentkezve ÉS van "xyz" joga
export default function VedettUtvonal({ jog }) {
  const { felhasznalo, jogosult } = useAuth();
  const location = useLocation();

  // "Ki vagy?" -> nincs bejelentkezve: irány a bejelentkezés (mint a 401)
  if (!felhasznalo) {
    return <Navigate to="/bejelentkezes" replace state={{ honnan: location.pathname }} />;
  }

  // "Mit tehetsz?" -> be van jelentkezve, de nincs joga: hibaoldal (mint a 403)
  if (jog && !jogosult(jog)) {
    return (
      <div className="kartya">
        <h1>⛔ Nincs jogosultságod</h1>
        <p>Ez az oldal a te szerepköröddel ({felhasznalo.szerepkor}) nem érhető el.</p>
      </div>
    );
  }

  return <Outlet />;
}

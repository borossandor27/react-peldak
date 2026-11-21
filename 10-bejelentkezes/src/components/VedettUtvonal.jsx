import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext.jsx';

// Ha nincs bejelentkezve, átirányít a bejelentkezéshez, és megjegyzi, honnan jött,
// hogy a sikeres bejelentkezés után oda vihessük vissza.
export default function VedettUtvonal() {
  const { felhasznalo } = useAuth();
  const location = useLocation();

  if (!felhasznalo) {
    return <Navigate to="/bejelentkezes" replace state={{ honnan: location.pathname }} />;
  }
  return <Outlet />;
}

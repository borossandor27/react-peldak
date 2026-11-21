// =====================================================
// 10 - Bejelentkezés: token, AuthContext, védett oldalak
// Indítás két terminálban:  npm run szerver   és   npm run 10
//
//   /               Fooldal        bárki
//   /bejelentkezes  Bejelentkezes  bárki
//   /konyvek        Konyvek        csak bejelentkezve (GET /api/konyvek tokennel)
//   /profil         Profil         csak bejelentkezve (GET /api/auth/en)
// =====================================================
import { BrowserRouter, Routes, Route, Link } from 'react-router';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Menu from './components/Menu.jsx';
import VedettUtvonal from './components/VedettUtvonal.jsx';
import Bejelentkezes from './pages/Bejelentkezes.jsx';
import Konyvek from './pages/Konyvek.jsx';
import Profil from './pages/Profil.jsx';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Menu />}>
            <Route index element={<Fooldal />} />
            <Route path="bejelentkezes" element={<Bejelentkezes />} />

            {/* Minden útvonal, ami ezen belül van, csak bejelentkezve érhető el */}
            <Route element={<VedettUtvonal />}>
              <Route path="konyvek" element={<Konyvek />} />
              <Route path="profil" element={<Profil />} />
            </Route>

            <Route path="*" element={<p className="kartya">404 – Nincs ilyen oldal.</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

function Fooldal() {
  const { felhasznalo } = useAuth();
  return (
    <div className="kartya">
      <h1>Iskolai könyvtár</h1>
      {felhasznalo ? (
        <p>
          Szia, {felhasznalo.nev}! Nézd meg a <Link to="/konyvek">könyveket</Link>.
        </p>
      ) : (
        <p>
          A könyvek listájához <Link to="/bejelentkezes">jelentkezz be</Link>. (Próbáld meg előbb közvetlenül a{' '}
          <Link to="/konyvek">/konyvek</Link> oldalt megnyitni!)
        </p>
      )}
    </div>
  );
}

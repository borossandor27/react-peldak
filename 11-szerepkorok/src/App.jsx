// =====================================================
// 11 - Szerepkörök és jogosultságok a frontenden
// Indítás két terminálban:  npm run szerver   és   npm run 11
//
//   Oldal / művelet        user   librarian   admin
//   /konyvek (lista)        ✔        ✔          ✔
//   új könyv űrlap          –        ✔          ✔
//   törlés gomb             –        –          ✔
//   /felhasznalok           –        –          ✔
// =====================================================
import { BrowserRouter, Routes, Route, Link } from 'react-router';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Menu from './components/Menu.jsx';
import VedettUtvonal from './components/VedettUtvonal.jsx';
import Bejelentkezes from './pages/Bejelentkezes.jsx';
import Konyvek from './pages/Konyvek.jsx';
import Profil from './pages/Profil.jsx';
import Felhasznalok from './pages/Felhasznalok.jsx';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Menu />}>
            <Route index element={<Fooldal />} />
            <Route path="bejelentkezes" element={<Bejelentkezes />} />

            <Route element={<VedettUtvonal />}>
              <Route path="profil" element={<Profil />} />
            </Route>
            <Route element={<VedettUtvonal jog="konyv:olvas" />}>
              <Route path="konyvek" element={<Konyvek />} />
            </Route>
            <Route element={<VedettUtvonal jog="felhasznalo:kezel" />}>
              <Route path="felhasznalok" element={<Felhasznalok />} />
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
      <h1>Iskolai könyvtár – szerepkörökkel</h1>
      {!felhasznalo && (
        <p>
          <Link to="/bejelentkezes">Jelentkezz be</Link> egymás után a három próbafiókkal (jelszó: <code>Jelszo123</code>),
          és figyeld meg, mit látsz:
        </p>
      )}
      <ul>
        <li>
          <code>olvaso@konyvtar.hu</code> – olvasó
        </li>
        <li>
          <code>konyvtaros@konyvtar.hu</code> – könyvtáros
        </li>
        <li>
          <code>admin@konyvtar.hu</code> – adminisztrátor
        </li>
      </ul>
    </div>
  );
}

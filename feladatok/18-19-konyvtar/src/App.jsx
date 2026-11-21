// =====================================================
// 18-19. feladat - Könyvtár szerepkörökkel + admin felület
// Indítás KÉT terminálban:  npm run szerver   és   npm run f18
// A feladat leírása: feladatok/FELADATOK-3.md · Mintapélda: 11-szerepkorok
//
// KÉSZ fájlok (a 11-es mintapéldából): api.js, context/AuthContext.jsx, pages/Bejelentkezes.jsx
// A te dolgod: jogok.js, components/VedettUtvonal.jsx, components/Jogosult.jsx,
//              pages/Konyvek.jsx, pages/KonyvSzerkeszto.jsx, pages/Felhasznalok.jsx (19.), menü
//
//   /                          -> átirányítás a /konyvek-re
//   /bejelentkezes             bárki
//   /konyvek                   konyv:olvas
//   /konyvek/uj                konyv:letrehoz
//   /konyvek/:id/szerkesztes   konyv:modosit
//   /admin/felhasznalok        felhasznalo:kezel   (19. feladat)
//
// Próbafiókok (jelszó: Jelszo123): olvaso@konyvtar.hu, konyvtaros@konyvtar.hu, admin@konyvtar.hu
// =====================================================
import { BrowserRouter, Routes, Route } from 'react-router';
import { AuthProvider } from './context/AuthContext.jsx';
import Bejelentkezes from './pages/Bejelentkezes.jsx';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* TODO: Menu elrendezés, védett útvonalak jogosultsággal */}
          <Route path="*" element={<Bejelentkezes />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

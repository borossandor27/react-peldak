// =====================================================
// 16-17. feladat - Iskolai portál: bejelentkezés, regisztráció
// Indítás KÉT terminálban:  npm run szerver   és   npm run f16
// A feladat leírása: feladatok/FELADATOK-3.md · Mintapélda: 10-bejelentkezes
//
//   /               Főoldal         bárki
//   /bejelentkezes  Bejelentkezes   bárki
//   /regisztracio   Regisztracio    bárki (17. feladat)
//   /szakkorok      Szakkorok       csak bejelentkezve  -> GET /api/szakkorok
//   /profil         Profil          csak bejelentkezve  -> GET /api/auth/en
//
// Próbafiókok (jelszó: Jelszo123): diak@iskola.hu, tanar@iskola.hu, admin@iskola.hu
// =====================================================
import { AuthProvider } from './context/AuthContext.jsx';

export default function App() {
  // TODO: AuthProvider > BrowserRouter > Routes; menü; védett útvonalak
  return (
    <AuthProvider>
      <h1>🏫 Iskolai portál</h1>
    </AuthProvider>
  );
}

// =====================================================
// 20. feladat - Szakkörök (ZÁRÓ PROJEKT)
// Indítás KÉT terminálban:  npm run szerver   és   npm run f20
// A feladat leírása (és az API végpontjai): feladatok/FELADATOK-3.md
//
// KÉSZ: api.js, context/AuthContext.jsx (jogosult(jog) függvénnyel)
// Minden mást te tervezel és írsz meg. Használd fel bátran a korábbi feladataid
// komponenseit (VedettUtvonal, Jogosult, Menu, Bejelentkezes ...)!
//
// Próbafiókok (jelszó: Jelszo123):
//   diak@iskola.hu   Diák Dóra       diak2@iskola.hu   Diák Dániel
//   tanar@iskola.hu  Tanár Tamás     tanar2@iskola.hu  Tanár Teréz
//   admin@iskola.hu  Igazgató Imre
// =====================================================
import { AuthProvider } from './context/AuthContext.jsx';

export default function App() {
  return (
    <AuthProvider>
      <h1>🎨 Szakkörök</h1>
      <p>Kezdd a tervezéssel: oldalak, útvonalak, komponensek, jogok!</p>
    </AuthProvider>
  );
}

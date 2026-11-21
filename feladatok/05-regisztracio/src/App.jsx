// =====================================================
// 5. feladat - Regisztrációs űrlap
// Indítás: npm run f05
// A feladat leírása: feladatok/FELADATOK.md
// =====================================================
import { useState } from 'react';
import { ellenoriz, jelszoErosseg } from './ellenorzes.js';

const URES = { felhasznalonev: '', email: '', jelszo: '', jelszo2: '', szuletes: '', nem: '', aszf: false };

const EROSSEG = [
  { szoveg: 'nagyon gyenge', szin: '#dc2626' },
  { szoveg: 'gyenge', szin: '#ea580c' },
  { szoveg: 'közepes', szin: '#d97706' },
  { szoveg: 'erős', szin: '#65a30d' },
  { szoveg: 'nagyon erős', szin: '#16a34a' },
];

export default function App() {
  const [adat, setAdat] = useState(URES);

  // TODO: további state-ek:
  //   - melyik mezőből lépett már ki a felhasználó (onBlur) -> csak ezeknél mutatunk hibát
  //   - megpróbálta-e már beküldeni (ekkor minden hiba látszik)
  //   - a sikeres regisztráció adatai (ekkor az űrlap helyett egy üdvözlő kártya jelenik meg)

  // TODO: a hibákat NE tárold state-ben - számold ki minden rendereléskor: ellenoriz(adat)

  function valtozas(e) {
    // TODO: közös kezelő minden mezőhöz (checkboxnál a checked kell!)
  }

  function bekuld(e) {
    e.preventDefault();
    // TODO
  }

  return (
    <form className="kartya" onSubmit={bekuld} noValidate style={{ maxWidth: 420 }}>
      <h1>Regisztráció</h1>
      {/* TODO: mezők: felhasználónév, e-mail, jelszó (+ erősségjelző sáv), jelszó még egyszer,
                születési dátum (type="date"), nem (3 rádiógomb), ÁSZF checkbox
                Minden mező alatt piros hibaüzenet, ha kell; hibás mezőnek piros kerete legyen. */}
      <p className="halvany">{JSON.stringify(adat)}</p>
      <button type="submit">Regisztrálok</button>
    </form>
  );
}

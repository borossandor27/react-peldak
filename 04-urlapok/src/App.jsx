// =====================================================
// 04 - Űrlapok: vezérelt (controlled) beviteli mezők, ellenőrzés, beküldés
// Indítás: npm run 04
//
// Vezérelt mező: az értéke a state-ből jön (value), és minden gépelés
// a state-et frissíti (onChange). Így a state az "igazság forrása".
// =====================================================
import { useState } from 'react';

const URES = { nev: '', email: '', kor: '', szak: 'szoftverfejleszto', hirlevel: false, megjegyzes: '' };

export default function App() {
  return (
    <>
      <h1>Űrlapok</h1>
      <EgyMezo />
      <Jelentkezes />
    </>
  );
}

// ---------- 1. Egyetlen vezérelt mező ----------
function EgyMezo() {
  const [szoveg, setSzoveg] = useState('');

  return (
    <div className="kartya">
      <label htmlFor="szoveg">Írj valamit:</label>
      <input id="szoveg" value={szoveg} onChange={(e) => setSzoveg(e.target.value)} />
      {/* Számított (derived) érték: NEM kell külön state-be tenni, a renderelésnél kiszámoljuk */}
      <p>
        {szoveg.length} karakter, nagybetűvel: <b>{szoveg.toUpperCase()}</b>
      </p>
    </div>
  );
}

// ---------- 2. Több mezős űrlap egy objektum-state-tel ----------
function Jelentkezes() {
  const [adat, setAdat] = useState(URES);
  const [hibak, setHibak] = useState({});
  const [elkuldve, setElkuldve] = useState(null);

  // EGY közös kezelő minden mezőhöz: a mező "name" attribútuma mondja meg, melyik kulcsot írjuk
  function valtozas(e) {
    const { name, value, type, checked } = e.target;
    setAdat({ ...adat, [name]: type === 'checkbox' ? checked : value });
  }

  function ellenoriz(a) {
    const h = {};
    if (a.nev.trim().length < 3) h.nev = 'A név legalább 3 karakter legyen.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email)) h.email = 'Érvénytelen e-mail cím.';
    const kor = Number(a.kor);
    if (!Number.isInteger(kor) || kor < 14 || kor > 99) h.kor = 'Az életkor 14 és 99 közötti egész szám legyen.';
    return h;
  }

  function bekuld(e) {
    // Az űrlap alapból újratöltené az oldalt -> ezt tiltjuk le
    e.preventDefault();
    const h = ellenoriz(adat);
    setHibak(h);
    if (Object.keys(h).length > 0) return;

    setElkuldve({ ...adat, kor: Number(adat.kor) });
    setAdat(URES); // űrlap ürítése
  }

  return (
    <div className="kartya">
      <h2>Jelentkezés</h2>
      {/* noValidate: a böngésző saját ellenőrzése helyett a miénket használjuk */}
      <form onSubmit={bekuld} noValidate>
        <label htmlFor="nev">Név</label>
        <input id="nev" name="nev" value={adat.nev} onChange={valtozas} />
        {hibak.nev && <div className="hiba">{hibak.nev}</div>}

        <label htmlFor="email">E-mail</label>
        <input id="email" name="email" type="email" value={adat.email} onChange={valtozas} />
        {hibak.email && <div className="hiba">{hibak.email}</div>}

        <label htmlFor="kor">Életkor</label>
        {/* Az input értéke MINDIG szöveg, még type="number" esetén is! */}
        <input id="kor" name="kor" type="number" value={adat.kor} onChange={valtozas} />
        {hibak.kor && <div className="hiba">{hibak.kor}</div>}

        <label htmlFor="szak">Szak</label>
        <select id="szak" name="szak" value={adat.szak} onChange={valtozas}>
          <option value="szoftverfejleszto">Szoftverfejlesztő</option>
          <option value="infrastruktura">Infrastruktúra üzemeltető</option>
          <option value="logisztika">Logisztika</option>
        </select>

        <label>
          {/* checkbox-nál value helyett checked! */}
          <input type="checkbox" name="hirlevel" checked={adat.hirlevel} onChange={valtozas} /> Kérek hírlevelet
        </label>

        <label htmlFor="megjegyzes">Megjegyzés</label>
        <textarea id="megjegyzes" name="megjegyzes" rows={3} value={adat.megjegyzes} onChange={valtozas} />

        <p>
          <button type="submit">Jelentkezem</button>{' '}
          <button type="button" className="masodlagos" onClick={() => setAdat(URES)}>
            Törlés
          </button>
        </p>
      </form>

      {elkuldve && (
        <>
          <p className="siker">✔ Sikeres jelentkezés! A beküldött adatok:</p>
          <pre>{JSON.stringify(elkuldve, null, 2)}</pre>
        </>
      )}
    </div>
  );
}

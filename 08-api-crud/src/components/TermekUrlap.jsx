import { useState } from 'react';

const URES = { nev: '', kategoria: '', ar: '', keszlet: '' };

export default function TermekUrlap({ onMentes }) {
  const [adat, setAdat] = useState(URES);
  const [hiba, setHiba] = useState(null);
  const [kuldes, setKuldes] = useState(false);

  const valtozas = (e) => setAdat({ ...adat, [e.target.name]: e.target.value });

  async function bekuld(e) {
    e.preventDefault();
    setHiba(null);
    setKuldes(true); // amíg a kérés tart, a gomb le van tiltva (ne lehessen kétszer elküldeni)
    try {
      // A szerver SZÁMOT vár, az input viszont szöveget ad -> átalakítjuk
      await onMentes({ ...adat, ar: Number(adat.ar), keszlet: Number(adat.keszlet) });
      setAdat(URES);
    } catch (err) {
      // Itt jelenik meg a szerver ellenőrzésének eredménye (400 { hibak: [...] })
      setHiba(err.message);
    } finally {
      setKuldes(false);
    }
  }

  return (
    <form className="kartya" onSubmit={bekuld}>
      <h2>Új termék</h2>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input name="nev" placeholder="Név" value={adat.nev} onChange={valtozas} />
        <input name="kategoria" placeholder="Kategória" value={adat.kategoria} onChange={valtozas} />
        <input name="ar" type="number" placeholder="Ár (Ft)" value={adat.ar} onChange={valtozas} />
        <input name="keszlet" type="number" placeholder="Készlet" value={adat.keszlet} onChange={valtozas} />
        <button type="submit" disabled={kuldes}>
          {kuldes ? 'Mentés...' : 'Hozzáad'}
        </button>
      </div>
      {hiba && <p className="hiba">{hiba}</p>}
    </form>
  );
}

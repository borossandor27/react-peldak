import { useState } from 'react';

// A beírt szöveg csak ezt a komponenst érdekli -> HELYI state.
// A kész teendőt viszont a szülőnek "szóljuk fel" az onHozzaad callbackkel.
export default function UjTeendo({ onHozzaad }) {
  const [szoveg, setSzoveg] = useState('');

  function bekuld(e) {
    e.preventDefault();
    if (szoveg.trim() === '') return;
    onHozzaad(szoveg.trim());
    setSzoveg('');
  }

  return (
    <form onSubmit={bekuld} style={{ display: 'flex', gap: 8 }}>
      <input value={szoveg} onChange={(e) => setSzoveg(e.target.value)} placeholder="Új teendő..." style={{ flex: 1 }} />
      <button type="submit">Hozzáad</button>
    </form>
  );
}

import { Link, useSearchParams } from 'react-router';
import { TANTARGYAK } from '../adatok.js';

export default function Tantargyak() {
  // A query string (?evfolyam=13) olvasása és írása - mint a useState, csak az URL-ben tárolja.
  // Előny: a szűrt oldal linkje elmenthető, megosztható, a Vissza gomb is működik.
  const [params, setParams] = useSearchParams();
  const evfolyam = params.get('evfolyam') ?? '';

  const lista = evfolyam ? TANTARGYAK.filter((t) => t.evfolyam === Number(evfolyam)) : TANTARGYAK;

  function valt(e) {
    setParams(e.target.value ? { evfolyam: e.target.value } : {});
  }

  return (
    <div className="kartya">
      <h1>Tantárgyak</h1>
      <label htmlFor="evf">Évfolyam</label>
      <select id="evf" value={evfolyam} onChange={valt}>
        <option value="">Mind</option>
        <option value="11">11.</option>
        <option value="12">12.</option>
        <option value="13">13.</option>
      </select>
      <ul>
        {lista.map((t) => (
          <li key={t.id}>
            <Link to={`/tantargyak/${t.id}`}>{t.nev}</Link> <span className="halvany">({t.evfolyam}. évf.)</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

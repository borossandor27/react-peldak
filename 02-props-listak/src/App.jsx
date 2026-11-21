// =====================================================
// 02 - Props, children, listák (map + key), feltételes megjelenítés
// Indítás: npm run 02
// =====================================================
import DiakKartya from './components/DiakKartya.jsx';
import Doboz from './components/Doboz.jsx';
import { DIAKOK } from './diakok.js';

export default function App() {
  const atlag = DIAKOK.reduce((osszeg, d) => osszeg + d.atlag, 0) / DIAKOK.length;
  const kituno = DIAKOK.filter((d) => d.atlag >= 4.5);

  return (
    <>
      <h1>Osztálynévsor</h1>

      {/* children: ami a nyitó és záró tag KÖZÉ kerül */}
      <Doboz cim="Statisztika">
        <p>Létszám: {DIAKOK.length} fő</p>
        <p>Osztályátlag: {atlag.toFixed(2)}</p>
        {/* && : csak akkor jelenik meg, ha a bal oldal igaz */}
        {kituno.length > 0 && <p>Kitűnők: {kituno.map((d) => d.nev).join(', ')}</p>}
      </Doboz>

      {/* Lista megjelenítése: map -> JSX elemek tömbje. Minden elemnek EGYEDI key kell! */}
      <div className="racs">
        {DIAKOK.map((diak) => (
          <DiakKartya
            key={diak.id}
            nev={diak.nev}
            osztaly={diak.osztaly}
            atlag={diak.atlag}
            hobbik={diak.hobbik}
            kollegista={diak.kollegista}
          />
        ))}
      </div>

      {/* Ugyanez rövidebben: az objektum összes mezőjét átadjuk propként */}
      <Doboz cim="Első diák (spread operátorral átadva)">
        <DiakKartya {...DIAKOK[0]} />
      </Doboz>
    </>
  );
}

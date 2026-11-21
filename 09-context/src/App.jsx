// =====================================================
// 09 - Context: közös adat sok komponensnek
// Indítás: npm run 09
//
//   <TemaProvider>              ← sotet, valt, szinek
//     <KedvencekProvider>       ← kedvencek, kedvenc(id), valt(id), urit()
//       <Oldal>
//         <Fejlec />            ← témaváltó gomb + kedvencek száma
//         <FilmLista>
//           <FilmKartya />      ← ★ gomb
// A Fejlec és a FilmKartya NEM kap propot, mégis ugyanazt az adatot látja.
// =====================================================
import { TemaProvider, useTema } from './context/TemaContext.jsx';
import { KedvencekProvider, useKedvencek } from './context/KedvencekContext.jsx';

const FILMEK = [
  { id: 1, cim: 'A Gyűrűk Ura', ev: 2001 },
  { id: 2, cim: 'Csillagok között', ev: 2014 },
  { id: 3, cim: 'Mátrix', ev: 1999 },
  { id: 4, cim: 'Kincsem', ev: 2017 },
];

export default function App() {
  return (
    <TemaProvider>
      <KedvencekProvider>
        <Oldal />
      </KedvencekProvider>
    </TemaProvider>
  );
}

function Oldal() {
  const { szinek } = useTema();
  return (
    <div style={{ background: szinek.hatter, color: szinek.szoveg, padding: 16, borderRadius: 10, minHeight: 300 }}>
      <Fejlec />
      <FilmLista />
    </div>
  );
}

function Fejlec() {
  const { sotet, valt } = useTema();
  const { kedvencek, urit } = useKedvencek();
  return (
    <nav>
      <h1 style={{ margin: 0, flex: 1 }}>🎬 Filmek</h1>
      <span>★ {kedvencek.length} kedvenc</span>
      <button className="masodlagos" onClick={urit} disabled={kedvencek.length === 0}>
        Ürít
      </button>
      <button onClick={valt}>{sotet ? '☀️ Világos' : '🌙 Sötét'}</button>
    </nav>
  );
}

function FilmLista() {
  return (
    <div className="racs">
      {FILMEK.map((f) => (
        <FilmKartya key={f.id} film={f} />
      ))}
    </div>
  );
}

function FilmKartya({ film }) {
  const { szinek } = useTema();
  const { kedvenc, valt } = useKedvencek();
  return (
    <div className="kartya" style={{ background: szinek.kartya, color: szinek.szoveg }}>
      <h3>{film.cim}</h3>
      <p>{film.ev}</p>
      <button className={kedvenc(film.id) ? '' : 'masodlagos'} onClick={() => valt(film.id)}>
        {kedvenc(film.id) ? '★ Kedvenc' : '☆ Kedvencnek jelöl'}
      </button>
    </div>
  );
}

// Egy komponens = egy fájl, a fájl neve megegyezik a komponens nevével.
// A { cim } a "props" (tulajdonságok) - erről bővebben a 02-es példában.
export default function Fejlec({ cim }) {
  return (
    <header>
      <h1>⚛️ {cim}</h1>
    </header>
  );
}

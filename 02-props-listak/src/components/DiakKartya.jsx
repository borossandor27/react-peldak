// A props egy objektum: { nev, osztaly, atlag, ... }
// Destrukturálással rögtön szétszedjük, és alapértelmezett értéket is adhatunk.
// A props CSAK OLVASHATÓ - a komponens nem írhatja felül!
export default function DiakKartya({ nev, osztaly, atlag, hobbik = [], kollegista = false }) {
  // Feltételes érték: ?: (ternary)
  const szin = atlag >= 4.5 ? 'green' : atlag < 2 ? 'red' : 'inherit';

  return (
    <div className="kartya">
      <h3>
        {nev} {kollegista && '🏠'}
      </h3>
      <p className="halvany">{osztaly}</p>
      <p style={{ color: szin }}>Átlag: {atlag.toFixed(1)}</p>

      {/* Feltételes megjelenítés: ha nincs hobbi, más szöveg */}
      {hobbik.length === 0 ? (
        <p>Nincs megadott hobbi.</p>
      ) : (
        <ul>
          {hobbik.map((hobbi) => (
            // Itt a hobbi szövege egyedi, ezért jó kulcsnak
            <li key={hobbi}>{hobbi}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

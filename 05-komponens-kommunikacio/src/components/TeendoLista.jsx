import TeendoElem from './TeendoElem.jsx';

// "Buta" (presentational) komponens: nincs saját state-je, csak megjelenít és továbbad
export default function TeendoLista({ teendok, onValt, onTorol }) {
  if (teendok.length === 0) return <p className="halvany">Nincs megjeleníthető teendő.</p>;

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {teendok.map((t) => (
        <TeendoElem key={t.id} teendo={t} onValt={onValt} onTorol={onTorol} />
      ))}
    </ul>
  );
}

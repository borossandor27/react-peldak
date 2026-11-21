const GOMBOK = [
  { ertek: 'mind', felirat: 'Mind' },
  { ertek: 'aktiv', felirat: 'Aktív' },
  { ertek: 'kesz', felirat: 'Kész' },
];

export default function Szuro({ aktualis, onValt }) {
  return (
    <p style={{ display: 'flex', gap: 6 }}>
      {GOMBOK.map((g) => (
        <button key={g.ertek} className={g.ertek === aktualis ? '' : 'masodlagos'} onClick={() => onValt(g.ertek)}>
          {g.felirat}
        </button>
      ))}
    </p>
  );
}

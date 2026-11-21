export default function TeendoElem({ teendo, onValt, onTorol }) {
  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
      <input type="checkbox" checked={teendo.kesz} onChange={() => onValt(teendo.id)} />
      <span style={{ flex: 1, textDecoration: teendo.kesz ? 'line-through' : 'none' }}>{teendo.szoveg}</span>
      <button className="veszely" onClick={() => onTorol(teendo.id)}>
        Törlés
      </button>
    </li>
  );
}

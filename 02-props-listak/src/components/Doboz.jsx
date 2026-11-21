// A "children" egy különleges prop: a nyitó és záró tag közötti tartalom.
// Így "keret" komponenseket készíthetünk, amelyekbe bármit be lehet tenni.
export default function Doboz({ cim, children }) {
  return (
    <section className="kartya" style={{ borderLeft: '4px solid var(--fo)' }}>
      <h2>{cim}</h2>
      {children}
    </section>
  );
}

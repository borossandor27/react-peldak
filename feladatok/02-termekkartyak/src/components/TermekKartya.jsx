// TODO: TermekKartya komponens
// Props: nev, ar, akcio, keszlet, ertekeles
//
// - akciónál: piros "−20%" címke a jobb felső sarokban, áthúzott eredeti ár (<s>) és piros akciós ár
// - az akciós ár 10 Ft-ra kerekítve (ezt a függvényt exportáld is, az App-ban is kell!)
// - értékelés csillagokkal: ★★★★☆ (kerekítve)
// - készlet: 0 -> "Elfogyott" (piros) és halványított kártya; < 5 -> "Utolsó N darab!"; egyébként "Raktáron"
// - "Kosárba" gomb, elfogyott terméknél letiltva
// - árak ezres tagolással: 24 990 Ft  ->  toLocaleString('hu-HU')

export function akciosAr({ ar, akcio }) {
  // TODO
  return ar;
}

export default function TermekKartya() {
  return <div className="kartya">TODO</div>;
}

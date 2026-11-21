// =====================================================
// Context: "globális" adat, amit bármelyik komponens elérhet
// props-ok továbbadogatása (prop drilling) nélkül.
//
// 3 lépés:
//   1. createContext()           - létrehozzuk
//   2. <Context value={...}>     - a fa egy részét körbevesszük vele (Provider)
//   3. useContext(Context)       - bármelyik gyerek kiolvassa
// =====================================================
import { createContext, useContext, useState } from 'react';

const TemaContext = createContext(null);

// Provider komponens: itt van a state, és ezt adja tovább mindenkinek
export function TemaProvider({ children }) {
  const [sotet, setSotet] = useState(false);
  const valt = () => setSotet((s) => !s);

  const szinek = sotet ? { hatter: '#1f2430', szoveg: '#f5f6fa', kartya: '#2b3140' } : { hatter: '#f5f6fa', szoveg: '#1f2430', kartya: '#ffffff' };

  return <TemaContext value={{ sotet, valt, szinek }}>{children}</TemaContext>;
}

// Saját hook: kényelmesebb használat + hibaüzenet, ha valaki a Provideren kívül használná
export function useTema() {
  const ertek = useContext(TemaContext);
  if (!ertek) throw new Error('A useTema csak a <TemaProvider> belsejében használható!');
  return ertek;
}

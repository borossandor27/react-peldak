// Második context: a kedvencnek jelölt filmek listája.
// A state mellett a módosító függvényeket is a contextbe tesszük.
import { createContext, useContext, useState } from 'react';

const KedvencekContext = createContext(null);

export function KedvencekProvider({ children }) {
  const [kedvencek, setKedvencek] = useState([]);

  const kedvenc = (id) => kedvencek.includes(id);
  const valt = (id) => setKedvencek((k) => (k.includes(id) ? k.filter((x) => x !== id) : [...k, id]));
  const urit = () => setKedvencek([]);

  return <KedvencekContext value={{ kedvencek, kedvenc, valt, urit }}>{children}</KedvencekContext>;
}

export function useKedvencek() {
  const ertek = useContext(KedvencekContext);
  if (!ertek) throw new Error('A useKedvencek csak a <KedvencekProvider> belsejében használható!');
  return ertek;
}

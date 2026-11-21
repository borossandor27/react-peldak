// =====================================================
// 2. feladat - Termékkártyák
// Indítás: npm run f02
// A feladat leírása: feladatok/FELADATOK.md
// =====================================================
import { TERMEKEK } from './termekek.js';

export default function App() {
  // TODO: egyedi kategóriák ábécérendben (Set + sort + localeCompare)

  // TODO: összesítő adatok: termékek száma, akciósak száma, elfogyottak száma, legolcsóbb termék (akciós árral!)

  return (
    <>
      <h1>🖥️ TechBolt</h1>
      {/* TODO: összesítő kártya */}

      {/* TODO: kategóriánként egy <Kategoria nev="..." db={...}> komponens,
               benne a kategória termékei <TermekKartya /> komponensekkel (.racs elrendezésben) */}
      <pre>{JSON.stringify(TERMEKEK, null, 2)}</pre>
    </>
  );
}

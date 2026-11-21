// A hozzávalók mennyisége az "adag" számú adagra vonatkozik
export const RECEPTEK = [
  {
    id: 1, nev: 'Gulyásleves', kategoria: 'leves', ido: 120, nehezseg: 'közepes', adag: 4,
    hozzavalok: [
      { nev: 'marhalábszár', mennyiseg: 500, egyseg: 'g' },
      { nev: 'vöröshagyma', mennyiseg: 2, egyseg: 'db' },
      { nev: 'burgonya', mennyiseg: 4, egyseg: 'db' },
      { nev: 'sárgarépa', mennyiseg: 2, egyseg: 'db' },
      { nev: 'pirospaprika', mennyiseg: 2, egyseg: 'evőkanál' },
    ],
    lepesek: ['A hagymát zsiradékon üvegesre pároljuk.', 'Hozzáadjuk a kockára vágott húst, megpirítjuk.', 'Lehúzzuk a tűzről, megszórjuk paprikával, felöntjük vízzel.', 'Puhulásig főzzük, majd hozzáadjuk a zöldségeket és a burgonyát.'],
  },
  {
    id: 2, nev: 'Paradicsomleves', kategoria: 'leves', ido: 30, nehezseg: 'könnyű', adag: 4,
    hozzavalok: [
      { nev: 'paradicsomlé', mennyiseg: 1, egyseg: 'l' },
      { nev: 'cukor', mennyiseg: 3, egyseg: 'evőkanál' },
      { nev: 'betűtészta', mennyiseg: 100, egyseg: 'g' },
    ],
    lepesek: ['A paradicsomlét felforraljuk, ízesítjük cukorral és sóval.', 'Külön kifőzzük a tésztát, és a leveshez adjuk.'],
  },
  {
    id: 3, nev: 'Rántott csirkemell', kategoria: 'főétel', ido: 40, nehezseg: 'könnyű', adag: 2,
    hozzavalok: [
      { nev: 'csirkemell', mennyiseg: 400, egyseg: 'g' },
      { nev: 'tojás', mennyiseg: 2, egyseg: 'db' },
      { nev: 'liszt', mennyiseg: 50, egyseg: 'g' },
      { nev: 'zsemlemorzsa', mennyiseg: 100, egyseg: 'g' },
    ],
    lepesek: ['A húst kiklopfoljuk, sózzuk.', 'Lisztbe, tojásba, majd morzsába forgatjuk.', 'Bő, forró olajban mindkét oldalát aranybarnára sütjük.'],
  },
  {
    id: 4, nev: 'Lecsó', kategoria: 'főétel', ido: 35, nehezseg: 'könnyű', adag: 3,
    hozzavalok: [
      { nev: 'paprika', mennyiseg: 6, egyseg: 'db' },
      { nev: 'paradicsom', mennyiseg: 4, egyseg: 'db' },
      { nev: 'vöröshagyma', mennyiseg: 1, egyseg: 'db' },
      { nev: 'kolbász', mennyiseg: 150, egyseg: 'g' },
    ],
    lepesek: ['A hagymát és a kolbászt megpirítjuk.', 'Hozzáadjuk a felcsíkozott paprikát, puhára pároljuk.', 'Végül a paradicsomot is beletesszük, összeforraljuk.'],
  },
  {
    id: 5, nev: 'Palacsinta', kategoria: 'desszert', ido: 45, nehezseg: 'közepes', adag: 4,
    hozzavalok: [
      { nev: 'liszt', mennyiseg: 250, egyseg: 'g' },
      { nev: 'tej', mennyiseg: 5, egyseg: 'dl' },
      { nev: 'tojás', mennyiseg: 3, egyseg: 'db' },
      { nev: 'szódavíz', mennyiseg: 2, egyseg: 'dl' },
    ],
    lepesek: ['A hozzávalókat csomómentesre keverjük.', 'Fél órát pihentetjük.', 'Forró serpenyőben vékonyan kisütjük.'],
  },
  {
    id: 6, nev: 'Túrógombóc', kategoria: 'desszert', ido: 50, nehezseg: 'nehéz', adag: 4,
    hozzavalok: [
      { nev: 'túró', mennyiseg: 500, egyseg: 'g' },
      { nev: 'tojás', mennyiseg: 2, egyseg: 'db' },
      { nev: 'búzadara', mennyiseg: 100, egyseg: 'g' },
      { nev: 'zsemlemorzsa', mennyiseg: 80, egyseg: 'g' },
    ],
    lepesek: ['A túrót a tojással és a darával összegyúrjuk, 1 órát pihentetjük.', 'Gombócokat formázunk, és lobogó vízben kifőzzük.', 'Pirított morzsába forgatjuk, tejföllel tálaljuk.'],
  },
];

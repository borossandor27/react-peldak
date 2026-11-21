// Nagyon egyszerű "adatbázis" JSON fájlokban.
// Az első indításkor az alapadatok/ mappát lemásolja a data/ mappába, és onnantól ott dolgozik.
// Visszaállítás az eredeti adatokra: npm run szerver-reset
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';

const ALAP = join(import.meta.dirname, 'alapadatok');
const DATA = join(import.meta.dirname, 'data');

export function betolt(nev) {
  if (!existsSync(DATA)) mkdirSync(DATA);
  const fajl = join(DATA, `${nev}.json`);
  if (!existsSync(fajl)) copyFileSync(join(ALAP, `${nev}.json`), fajl);
  return JSON.parse(readFileSync(fajl, 'utf-8'));
}

export function ment(nev, adat) {
  writeFileSync(join(DATA, `${nev}.json`), JSON.stringify(adat, null, 2));
}

export function kovetkezoId(tomb) {
  return tomb.length === 0 ? 1 : Math.max(...tomb.map((e) => e.id)) + 1;
}

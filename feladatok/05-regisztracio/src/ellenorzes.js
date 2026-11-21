// =====================================================
// 5. feladat - ellenőrző függvények
// Ezek "tiszta" függvények: nincs bennük React, csak bemenet -> kimenet.
// =====================================================

// Visszaad egy objektumot, amelyben CSAK a hibás mezők szerepelnek:
//   { felhasznalonev: 'hibaüzenet', jelszo2: 'hibaüzenet', ... }
// Ha minden jó: {}
export function ellenoriz(adat) {
  const h = {};
  // TODO: felhasznalonev: 4–20 karakter, csak angol betű, szám és _   (reguláris kifejezés!)
  // TODO: email: érvényes formátum
  // TODO: jelszo: legalább 8 karakter, legyen benne nagybetű és szám
  // TODO: jelszo2: egyezzen a jelszóval
  // TODO: szuletes: kötelező, és legalább 14 éves legyen (használd az eletkor függvényt)
  // TODO: nem: kötelező választani
  // TODO: aszf: el kell fogadni
  return h;
}

// Betöltött évek száma: ha idén még nem volt születésnapja, eggyel kevesebb!
export function eletkor(datumSzoveg, ma = new Date()) {
  // TODO
  return 0;
}

// Jelszó erőssége 0–4 pontig. Egy-egy pont: hossz ≥ 8, hossz ≥ 12, kis- ÉS nagybetű,
// szám, speciális karakter (nem betű és nem szám). Legfeljebb 4 pont.
export function jelszoErosseg(jelszo) {
  // TODO
  return 0;
}

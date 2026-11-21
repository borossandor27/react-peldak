// =====================================================
// 20. feladat - jogosultságok
// Tervezd meg TE, milyen jogok kellenek! (A 18-19. feladat jogok.js-e a minta.)
// Az AuthContext a vanJoga függvényt használja: jogosult('valami:jog')
//
// Ne feledd: a tanár CSAK A SAJÁT szakkörét kezelheti - ezt a szerepkör önmagában
// nem dönti el, ehhez a szakkör tanar_id-ját is meg kell nézni (pl. kezelheti(felhasznalo, szakkor)).
// =====================================================

export const JOGOK = {
  diak: [],
  tanar: [],
  admin: [],
};

export function vanJoga(felhasznalo, jog) {
  return JOGOK[felhasznalo?.szerepkor]?.includes(jog) ?? false;
}

export const NAPOK = ['hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek'];

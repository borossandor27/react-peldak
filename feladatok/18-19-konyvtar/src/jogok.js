// =====================================================
// 18-19. feladat - Ki mit tehet? (mintapélda: 11-szerepkorok/src/jogok.js)
//
//   Jog                 user   librarian   admin
//   konyv:olvas          ✔        ✔          ✔
//   konyv:letrehoz       –        ✔          ✔
//   konyv:modosit        –        ✔          ✔     (szerkesztés, kiadás / visszavétel)
//   konyv:torol          –        –          ✔
//   felhasznalo:kezel    –        –          ✔
// =====================================================

export const JOGOK = {
  // TODO
};

export function vanJoga(felhasznalo, jog) {
  // TODO
  return false;
}

export const SZEREPKOR_NEVEK = { user: 'Olvasó', librarian: 'Könyvtáros', admin: 'Adminisztrátor' };

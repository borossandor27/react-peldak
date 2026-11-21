// =====================================================
// Melyik szerepkör mit tehet? - EGY helyen megadva.
// (Ugyanez a táblázat van a backend 09-authorization README "Továbblépés" részében.)
//
// A komponensek nem a szerepkört kérdezik ("admin-e?"), hanem a jogot ("törölhet-e?").
// Ha később új szerepkör jön, csak ezt a fájlt kell bővíteni.
// =====================================================
export const JOGOK = {
  user: ['konyv:olvas'],
  librarian: ['konyv:olvas', 'konyv:letrehoz'],
  admin: ['konyv:olvas', 'konyv:letrehoz', 'konyv:torol', 'felhasznalo:kezel'],
};

export function vanJoga(felhasznalo, jog) {
  return JOGOK[felhasznalo?.szerepkor]?.includes(jog) ?? false;
}

export const SZEREPKOR_NEVEK = {
  user: 'Olvasó',
  librarian: 'Könyvtáros',
  admin: 'Adminisztrátor',
  diak: 'Diák',
  tanar: 'Tanár',
};

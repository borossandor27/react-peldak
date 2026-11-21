# React gyakorló feladatok – 3. rész: backend, bejelentkezés, szerepkörök

**Ebben a részben mindig két terminál kell:**

```bash
npm run szerver     # 1. terminál – gyakorló API: http://localhost:3000
npm run f14         # 2. terminál – a React alkalmazás: http://localhost:5173
```

- A frontend a `/api/...` kéréseket a Vite **proxyn** keresztül küldi a szervernek (`vite.config.js`), ezért nincs CORS hiba.
- A szerver az adatokat a `szerver/data/` mappába menti. Az eredeti adatok visszaállítása: `npm run szerver-reset`.
- A szerver felépítése és végpontjai ugyanolyanok, mint a backend órán készített `09-authorization` példáé – a saját Express backendeddel is kipróbálhatod (lásd a `08-api-crud` README-jét).
- Minden próbafiók jelszava: **`Jelszo123`**

| # | Feladat | Téma | Nehézség | Indítás | Mintapélda |
|---|---|---|---|---|---|
| 14 | Termékkezelő | CRUD a szerverrel, szerveroldali keresés, hibaüzenetek | ★★★★ | `npm run f14` | 08 |
| 15 | Termékkezelő routerrel | oldalakra bontás, szerkesztés (PUT), közös űrlap | ★★★★ | `npm run f14` | 07, 08 |
| 16 | Iskolai portál – bejelentkezés | AuthContext, token, védett útvonal | ★★★★ | `npm run f16` | 10 |
| 17 | Iskolai portál – regisztráció | szerver mezőhibái, 409, lejárt token (401) | ★★★★ | `npm run f16` | 10 |
| 18 | Könyvtár szerepkörökkel | jogosultság-táblázat, feltételes UI, 403, 409 | ★★★★ | `npm run f18` | 11 |
| 19 | Admin felület | felhasználók, szerepkör módosítása | ★★★★ | `npm run f18` | 11 |
| 20 | **Szakkörök – záró projekt** | 3 szerepkörű alkalmazás önálló tervezéssel | ★★★★★ | `npm run f20` | 07–11 |

---

## 14. feladat – Termékkezelő ★★★★

**Mappa:** `feladatok/14-15-termekek/` · **API:** nyilvános, nem kell bejelentkezni

| Metódus | Végpont | Törzs | Válasz |
|---|---|---|---|
| GET | `/api/termekek?kereses=füzet` | – | 200, tömb (a `kereses` elhagyható) |
| GET | `/api/termekek/:id` | – | 200 / 404 `{ hiba }` |
| POST | `/api/termekek` | `{ nev, kategoria, ar, keszlet, leiras }` | 201 / 400 `{ hibak: [...] }` |
| PUT | `/api/termekek/:id` | ugyanaz (**teljes** termék) | 200 / 400 / 404 |
| DELETE | `/api/termekek/:id` | – | 204 / 404 |

**a) `api.js`:** írd meg a `termekApi` függvényeit a kész `keres()` segítségével.

**b) Lista** (egy oldalon minden):
- Táblázat: név, kategória, ár (`1 290 Ft`), készlet, törlés gomb. Az elfogyott termék készlete piros.
- **Keresés a szerveren**: a keresőmező a `?kereses=` paramétert küldi. Ne küldj kérést **minden leütésnél** – várj 300 ms-ot, és ha közben újra gépelt, az előző időzítőt töröld (ez a *debounce*). Amíg tölt: `Betöltés...` a mező mellett.
- **Kategória szűrő**: legördülő a betöltött termékek egyedi kategóriáiból (ez már a böngészőben szűr).
- **Készlet `−` / `+`** gombok: `PUT` kéréssel módosítják a készletet (a szerver a teljes terméket várja!). 0-nál a `−` letiltva.
- Alul: `8 termék · készletérték: 512 340 Ft · 1 elfogyott` (készletérték = ár × készlet összege).
- Ha a szerver nem fut: `Hiba: ... – fut a szerver? (npm run szerver)`

**c) Új termék űrlap** (`components/TermekUrlap.jsx`): név, kategória, ár, készlet, leírás. A számokat számként küldd! Ha a szerver 400-at ad, a `hibak` tömb elemeit **listában** jelenítsd meg (próbáld ki üres űrlappal). Küldés közben a gomb letiltva, felirata `Mentés...`.

**d) Törlés:** megerősítés után; a sikeres törlés után a sor eltűnik.

**Tippek**
- Debounce a takarító függvénnyel:
  ```js
  useEffect(() => {
    const idozito = setTimeout(() => { /* kérés */ }, 300);
    return () => clearTimeout(idozito);
  }, [kereses]);
  ```
- Ha egy lassú régebbi válasz egy újabb után érkezik, felülírná azt. Védekezés: `let aktualis = true;` az effektben, a takarításban `aktualis = false`, és csak akkor állíts state-et, ha még `aktualis`.
- Szöveg a címben: `encodeURIComponent(kereses)` (az ékezetek és a szóköz miatt).

---

## 15. feladat – Termékkezelő routerrel ★★★★

**Ugyanabban a mappában** alakítsd át a 14. feladatot többoldalas alkalmazássá:

| Útvonal | Oldal |
|---|---|
| `/` | átirányítás a `/termekek`-re |
| `/termekek` | a 14. feladat listája (a név link az adatlapra, mellette **Szerkeszt** link); az új termék űrlap **kikerül** innen |
| `/termekek/uj` | új termék (`POST`), mentés után az új termék adatlapjára visz |
| `/termekek/:id` | adatlap: minden adat + készletérték, **Szerkesztés** és **Törlés** gomb (törlés után vissza a listára) |
| `/termekek/:id/szerkesztes` | ugyanaz az űrlap **kitöltve** (`GET`, majd `PUT`), mentés után az adatlapra visz |
| nem létező id | `Nincs ilyen termék.` + link a listára (404) |

- Az új termék és a szerkesztés **ugyanazt** a `TermekUrlap` komponenst használja (`kezdo` és `onMentes` propokkal), és **ugyanazt** az oldalt (`TermekSzerkeszto`) – az `useParams()` `id`-je dönti el, melyik mód (új terméknél `undefined`).
- A menüben: **Termékek**, **+ Új termék**.

**Tippek**
- Az input értéke szöveg legyen: szerkesztéskor `String(kezdo.ar)`.
- A PUT-hoz az `id` nélküli objektum: `const { id, ...torzs } = termek;`

---

## 16. feladat – Iskolai portál: bejelentkezés ★★★★

**Mappa:** `feladatok/16-17-bejelentkezes/` · **Próbafiókok:** `diak@iskola.hu`, `tanar@iskola.hu`, `admin@iskola.hu`

| Metódus | Végpont | Törzs | Válasz |
|---|---|---|---|
| POST | `/api/auth/bejelentkezes` | `{ email, jelszo }` | 200 `{ token, felhasznalo }` / 401 |
| GET | `/api/auth/en` | – (token kell) | 200 `{ id, nev, email, szerepkor }` / 401 |
| GET | `/api/szakkorok` | – (token kell) | 200 tömb / 401 |

**a) `AuthContext`** – a fájl fejléce leírja, mit kell tudnia. A token a `Authorization: Bearer <token>` fejlécben megy (a kész `keres()` ezt megcsinálja, ha megkapja a `token`-t).

**b) Oldalak és menü**
- Menü kijelentkezve: **Főoldal**, **Bejelentkezés**, **Regisztráció**. Bejelentkezve: **Főoldal**, **Szakkörök**, `👤 Diák Dóra` (link a profilra), **Kijelentkezés**.
- **Bejelentkezés**: e-mail, jelszó (👁️ gombbal megmutatható), **Maradjak bejelentkezve** checkbox. A gomb csak kitöltött mezőknél aktív. Hibás adatoknál: `Hibás e-mail cím vagy jelszó.`, és a jelszómező ürüljön. Aki már be van jelentkezve, azt az oldal továbbküldi.
- **Szakkörök** (védett): kártyák a szakkörökről (név, leírás, nap, időpont, tanár, `Létszám: 2 / 12`).
- **Profil** (védett): a `GET /api/auth/en` adatai, a szerepkör magyarul (`diák`, `tanár`, `adminisztrátor`).
- Kijelentkezve a `/szakkorok` megnyitása → bejelentkezés → utána **vissza** a `/szakkorok`-ra.

**c) Maradjak bejelentkezve:** ha be van pipálva, a `localStorage`-ba ments, különben a `sessionStorage`-ba. Próbáld ki: zárd be a fület, és nyisd meg újra!

---

## 17. feladat – Iskolai portál: regisztráció, lejárt munkamenet ★★★★

**Ugyanabban a mappában.**

| Metódus | Végpont | Törzs | Válasz |
|---|---|---|---|
| POST | `/api/auth/regisztracio` | `{ nev, email, jelszo }` | 201 / 400 `{ hibak }` / 409 `{ hiba }` |

**a) Regisztráció oldal:** név, e-mail, jelszó, jelszó még egyszer.
- A két jelszó egyezését a **kliens** ellenőrzi (a szerver meg sem kapja a másodikat).
- A szerver 400-as válaszának **minden** hibája jelenjen meg listában; foglalt e-mailnél (409): `Ezzel az e-mail címmel már regisztráltak.`
- Sikeres regisztráció után **automatikusan jelentkezzen be**, és vigyen a profilra, ahol: `🎉 Sikeres regisztráció, üdv a portálon!` (Adatátadás: `navigate('/profil', { state: { uj: true } })`.)
- Az új felhasználó szerepköre `user` lesz – akkor is, ha valaki a böngésző konzolából `szerepkor: 'admin'`-t is küld. Próbáld ki!

**b) Lejárt munkamenet (401):**
- Indítsd a szervert így: `npm run szerver-30mp` – ekkor a token **30 másodperc** után lejár.
- Ha bármelyik tokenes kérés 401-et kap, az `apiKeres` jelentkeztesse ki a felhasználót, és a bejelentkező oldalon sárga dobozban jelenjen meg: `⚠️ A munkamenet lejárt, jelentkezz be újra.`
- A Szakkörök oldalon legyen egy **↻ Frissítés** gomb, hogy ki tudd próbálni.

---

## 18. feladat – Könyvtár szerepkörökkel ★★★★

**Mappa:** `feladatok/18-19-konyvtar/` · **Mintapélda:** `11-szerepkorok`
**Próbafiókok:** `olvaso@konyvtar.hu` (user), `konyvtaros@konyvtar.hu` (librarian), `admin@konyvtar.hu` (admin)

| Metódus | Végpont | Ki? | Megjegyzés |
|---|---|---|---|
| GET | `/api/konyvek`, `/api/konyvek/:id`, `/api/szerzok` | mindenki (bejelentkezve) | a könyvben `szerzo` (név) és `szerzo_id` is van |
| POST | `/api/konyvek` | librarian, admin | `{ cim, szerzo_id, ev }` |
| PUT | `/api/konyvek/:id` | librarian, admin | `{ cim, szerzo_id, ev, kiolcsonozve }` |
| DELETE | `/api/konyvek/:id` | admin | **409**, ha ki van kölcsönözve |

**Kész fájlok:** `api.js`, `context/AuthContext.jsx` (benne `jogosult(jog)`), `pages/Bejelentkezes.jsx`.

**a) `jogok.js`** – a fejlécben lévő táblázat alapján.

**b) `VedettUtvonal` (`jog` proppal) és `Jogosult` komponens** – mint a mintapéldában. Jog nélkül: `⛔ 403 – Nincs jogosultságod` oldal.

**c) Könyvek oldal** (`/konyvek`)
- Keresés címre / szerzőre, szűrő: *mind / elérhető / kikölcsönözve*; `6 könyv · 4 elérhető`.
- **Könyvtáros** és admin: **Kiad** / **Visszavesz** gomb (PUT a `kiolcsonozve` átbillentésével), **Szerkeszt** link.
- **Admin**: **Törlés** gomb – kikölcsönzött könyvnél letiltva, és ha a szerver mégis 409-et ad: `Kikölcsönzött könyvet nem lehet törölni – előbb vedd vissza!`
- Az olvasó **nem látja** a Műveletek oszlopot sem.
- A műveletek eredménye egy üzenetsorban: `Egri csillagok: visszavéve.`

**d) Új könyv / szerkesztés** (`/konyvek/uj`, `/konyvek/:id/szerkesztes`): cím, szerző **legördülőből** (`GET /api/szerzok`), év. A szerver hibái listában.

**e) Menü:** a menüpontok is jogosultságtól függnek: **Könyvek**, **+ Új könyv** (librarian, admin), **Felhasználók** (admin). Jobb oldalt: `👤 Könyvtáros Kata (Könyvtáros)`, **Kijelentkezés**.

**Ellenőrizd:** olvasóként írd be kézzel a címsorba: `/konyvek/uj` → 403 oldal. A konzolból küldött `DELETE` kérésre a szerver 403-at ad.

---

## 19. feladat – Admin felület ★★★★

**Ugyanabban a mappában**, útvonal: `/admin/felhasznalok` (`felhasznalo:kezel` jog).

| Metódus | Végpont | Törzs |
|---|---|---|
| GET | `/api/felhasznalok` (`?szerepkor=...`) | – |
| PATCH | `/api/felhasznalok/:id/szerepkor` | `{ szerepkor }` |
| DELETE | `/api/felhasznalok/:id` | – |

> A gyakorló szerveren az iskolai fiókok (diák, tanár) is ott vannak – itt csak a `user`, `librarian` és `admin` szerepkörűeket mutasd.

- Fent statisztika: `Olvasó: 1  Könyvtáros: 1  Adminisztrátor: 1`, alatta szerepkör-szűrő.
- Táblázat: név (a saját sorodnál `(te)`), e-mail, szerepkör **legördülő**, **Törlés** gomb.
- Szerepkör váltáskor megerősítés, siker esetén: `Olvasó Olga mostantól: Könyvtáros. (Új bejelentkezés után érvényes.)`
- **Saját magad** szerepkörét és fiókját nem módosíthatod – a vezérlők le vannak tiltva (és a szerver is 400-at adna).
- Törlés előtt: `Biztosan törlöd X fiókját? Ez nem vonható vissza!`

**Próbáld ki:** léptesd elő az olvasót könyvtárossá. Lépj be vele egy másik böngészőben (vagy inkognitó ablakban) **előtte és utána** – mikor kapja meg az új jogokat? Miért?

---

## 20. feladat – Szakkörök: záró projekt ★★★★★

**Mappa:** `feladatok/20-szakkorok/` · **Kész:** `api.js`, `context/AuthContext.jsx` · **Minden mást te tervezel.**

Készíts egy iskolai szakkörkezelő alkalmazást **három szerepkörrel**. A feladat nem mondja meg, milyen komponenseket készíts – ezt neked kell megtervezned. Mielőtt kódolni kezdesz, írd le (papíron vagy egy `TERV.md` fájlban): **útvonalak, oldalak, komponensek, jogok**.

**Próbafiókok** (`Jelszo123`): `diak@iskola.hu`, `diak2@iskola.hu`, `tanar@iskola.hu`, `tanar2@iskola.hu`, `admin@iskola.hu`

### Az API

| Metódus | Végpont | Ki? | Megjegyzés |
|---|---|---|---|
| GET | `/api/szakkorok` | mindenki | minden szakkörben: `tanar` (név), `tanar_id`, `letszam`, `max_letszam`, `jelentkeztem` (a bejelentkezett diák jelentkezett-e) |
| GET | `/api/szakkorok/:id` | mindenki | 404 |
| POST | `/api/szakkorok` | tanar, admin | `{ nev, leiras, nap, idopont, max_letszam }` + adminnál `tanar_id` |
| PUT | `/api/szakkorok/:id` | tanar (**saját**), admin | 403, ha más tanáré; 400, ha a max. létszám kisebb a jelenleginél |
| DELETE | `/api/szakkorok/:id` | admin | a jelentkezések is törlődnek |
| GET | `/api/szakkorok/:id/resztvevok` | tanar (**saját**), admin | `[{ id, nev, email, datum }]` |
| POST | `/api/szakkorok/:id/jelentkezes` | diak | 201, a frissített szakkört adja vissza; 409: már jelentkezett / betelt |
| DELETE | `/api/szakkorok/:id/jelentkezes` | diak | 204; 404, ha nem volt jelentkezve |
| GET | `/api/felhasznalok?szerepkor=tanar` | admin | a tanárok listája |
| PATCH | `/api/felhasznalok/:id/szerepkor` | admin | `{ szerepkor }` |

`nap`: `hétfő` … `péntek`; `idopont`: `ÓÓ:PP`; `max_letszam`: 1–50.

### Követelmények

**Mindenki (bejelentkezve)**
- Bejelentkezés után a **szerepkörtől függő kezdőoldalra** kerül: diák → órarend, tanár → saját szakkörei, admin → összes szakkör.
- **Összes szakkör**: kártyák napok és időpont szerint rendezve; szűrés napra és „csak ahol van szabad hely”; minden kártyán **létszámsáv** (`7 / 12 fő`, ≥ 80% narancs, tele piros `BETELT`).
- **Szakkör adatlap** (`/szakkorok/:id`).
- A menü szerepkörönként más.

**Diák**
- **Jelentkezem** / **Lejelentkezés** gomb a kártyán és az adatlapon (betelt szakkörnél letiltva, lejelentkezés előtt megerősítés). A kártya, amire jelentkezett, zöld bal szegélyt kap.
- **Órarendem**: hétfőtől péntekig öt oszlop, mindegyikben az aznapi szakkörei időrendben. Ha még sehova nem jelentkezett: üzenet + link a kínálatra.

**Tanár**
- **Saját szakköreim**: táblázat a szakköreiről (időpont, létszámsáv, Szerkeszt link), alatta az összes diák száma.
- **Új szakkör** létrehozása.
- **Saját** szakkörénél: **Szerkesztés** és a **résztvevők listája** (név, e-mail, jelentkezés dátuma) az adatlapon. **Más tanár** szakkörénél ezek nem látszanak, és a szerkesztő oldal közvetlen megnyitásakor is `⛔ Csak a saját szakkörödet szerkesztheted.`

**Admin**
- Minden szakkört szerkeszthet, látja a résztvevőket, **törölhet** (megerősítéssel).
- Új szakkörnél **tanárt választ** legördülőből.
- **Felhasználók** oldal: kereső, szerepkör módosítása (`diák`, `tanár`, `admin`); a saját sorát nem módosíthatja. Az új regisztráltak (`user`) itt kapnak szerepkört.

**Minőségi elvárások**
- Minden betöltésnél van `Betöltés...` és hibaüzenet.
- A szerver **minden** hibaüzenete (400 lista, 403, 404, 409) érthetően megjelenik.
- Küldés közben a gombok letiltva (ne lehessen kétszer jelentkezni).
- A jogosultságokat **egy helyen** (`jogok.js`) adod meg.
- Nincs ismétlődő kód: ami több oldalon kell (pl. a lista betöltése és a jelentkezés), az kerüljön **saját hookba** vagy közös komponensbe.

**Ellenőrizd mindhárom szerepkörrel** – és próbáld ki a „tiltott” dolgokat is a címsorból és a konzolból!

### Szorgalmi
- Regisztrációs oldal (az új fiók `user` lesz, amíg az admin szerepkört nem ad – addig egy „Várakozás jóváhagyásra” oldalt lásson).
- A diák órarendjében jelezd, ha két szakköre **ütközik** (ugyanazon a napon, ugyanabban az időpontban).
- Sötét téma kapcsoló Contexttel, `localStorage`-ba mentve.

---

**Vissza:** [2. rész](FELADATOK-2.md)

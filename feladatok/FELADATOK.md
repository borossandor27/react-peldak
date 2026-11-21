# React gyakorló feladatok – 1. rész: alapok

**Általános tudnivalók**

- Minden feladathoz van egy kiinduló mappa, benne `TODO` megjegyzésekkel. Ezeket kell megvalósítanod.
- Indítás a projekt gyökeréből: `npm run f01`, `npm run f02`, … – a böngésző magától megnyílik a **http://localhost:5173** címen. Leállítás: `Ctrl + C`.
- Mentéskor az oldal azonnal frissül, a state legtöbbször megmarad.
- **Mindig legyen nyitva a konzol (F12)!** A React ott jelzi a hibákat és figyelmeztetéseket (pl. hiányzó `key`).
- Saját fájl importálásakor írd ki a kiterjesztést: `import Tetel from './components/Tetel.jsx'`.
- Komponens = **nagybetűs** függvény, egy komponens = egy fájl a `components/` mappában.

| # | Feladat | Téma | Nehézség | Indítás | Mintapélda |
|---|---|---|---|---|---|
| 1 | Névjegykártya | JSX, komponensek, props, kifejezések | ★ | `npm run f01` | 01, 02 |
| 2 | Termékkártyák | props, `map` + `key`, feltételes megjelenítés, children | ★★ | `npm run f02` | 02 |
| 3 | Számláló és dobókocka | `useState`, események, számított értékek | ★ | `npm run f03` | 03 |
| 4 | Átváltó | vezérelt mezők, számított érték, egy state – két mező | ★★ | `npm run f04` | 04 |
| 5 | Regisztrációs űrlap | űrlap-ellenőrzés, `onBlur`, rádiógomb, checkbox, regex | ★★★ | `npm run f05` | 04 |
| 6 | Bevásárlólista | komponensekre bontás, state felemelése, tömb-state | ★★★ | `npm run f06` | 05 |

---

## 1. feladat – Névjegykártya ★

**Mappa:** `feladatok/01-nevjegykartya/`

Készíts egy névjegykártyát magadról **négy komponensből**. Az `App.jsx` elején lévő konstansokat írd át a saját adataidra.

| Komponens | Props | Mit jelenít meg? |
|---|---|---|
| `Fejlec` | – | `<h1>📇 Névjegykártyám</h1>` |
| `Nevjegy` | `nev`, `osztaly`, `kor`, `email`, `bemutatkozas` | monogram egy kék körben (`Minta Máté` → `MM`), név, `13.C · 18 éves`, bemutatkozás, kattintható e-mail cím (`mailto:`) |
| `Keszsegek` | `lista` | `Készségeim (5)` címsor, alatta a készségek lekerekített „címkékként” egymás mellett |
| `Lablec` | `nev` | `© 2026 Minta Máté` |

- Az életkort az `App` **számolja ki** az aktuális évből, és propként adja át.
- A `Nevjegy` és a `Keszsegek` egy `.kartya` osztályú `div`-ben legyen.

**Tippek**
- Monogram: `nev.split(' ').map(r => r[0]).join('')`
- Kör: `style={{ width: 80, height: 80, borderRadius: '50%', display: 'grid', placeItems: 'center' }}`
- Címkék egymás mellett: `display: 'flex', gap: 8, flexWrap: 'wrap'` és `listStyle: 'none'`.

---

## 2. feladat – Termékkártyák ★★

**Mappa:** `feladatok/02-termekkartyak/` · **Adatok:** `src/termekek.js`

Egy számítástechnikai bolt termékeit kell **kategóriánként csoportosítva** megjeleníteni.

**a) `TermekKartya` komponens** – props: `nev`, `ar`, `akcio`, `keszlet`, `ertekeles`

| Feltétel | Megjelenítés |
|---|---|
| `akcio > 0` | piros `−20%` címke a jobb felső sarokban, **áthúzott** eredeti ár, mellette piros akciós ár |
| `akcio === 0` | csak az ár, vastagon |
| mindig | értékelés csillagokkal: `4.5` → `★★★★★`, `3.9` → `★★★★☆` (kerekítve) |
| `keszlet === 0` | piros **Elfogyott** felirat, a kártya halványabb (`opacity: 0.5`), a **Kosárba** gomb letiltva |
| `keszlet < 5` | narancs **Utolsó 3 darab!** |
| egyébként | zöld **Raktáron** |

Az akciós ár 10 Ft-ra kerekítve: `7990 Ft −20%` → `6390 Ft`. Ezt egy exportált `akciosAr(termek)` függvény számolja, mert az `App`-ban is szükség lesz rá. Árak ezres tagolással: `24 990 Ft`.

**b) `Kategoria` komponens** – props: `nev`, `db`, `children`. Címsor: `Periféria (3)`, alatta a `children`.

**c) `App`**
- Összesítő kártya: `8 termék · 4 akciós · 2 elfogyott`, és a **legolcsóbb** termék neve és ára (akciós árral számolva!).
- A kategóriák ábécérendben, mindegyikben a hozzá tartozó termékek `.racs` elrendezésben.

**Tippek**
- Egyedi kategóriák: `[...new Set(TERMEKEK.map(t => t.kategoria))]`
- Az összes mező átadása: `<TermekKartya key={t.id} {...t} />`
- Abszolút pozíció a sarokban: a kártyára `position: 'relative'`, a címkére `position: 'absolute', top: 8, right: 8`.

---

## 3. feladat – Számláló és dobókocka ★

**Mappa:** `feladatok/03-szamlalo-kocka/src/App.jsx`

**a) Számláló** (0 és 20 között)

- Nagy számmal: `7 / 20`. Maximumnál a szám piros, alatta: `Elérted a maximumot!`
- Lépésköz választó: `1`, `2`, `5` gomb. Az aktív kitöltött, a többi `masodlagos` osztályú.
- `−5` / `+5` gombok (a felirat a lépésközt mutatja). Az érték **soha** nem lép ki a 0–20 tartományból: `18 + 5` → `20`. A határon a gomb letiltva.
- **Nullázás** gomb.

**b) Dobókocka**

- **Dobás** gomb: 1–6 véletlen szám, a kocka lapja nagy méretben (`⚀ ⚁ ⚂ ⚃ ⚄ ⚅`). Dobás előtt: 🎲
- Statisztika: `Dobások: 12 · Összeg: 41 · Átlag: 3.42 · Hatosok: 2`
- Az utolsó 10 dobás, a legújabb elöl: `Utolsó 10: 6, 2, 5, ...`
- Ha az utolsó dobás hatos: `🎉 Hatos!`
- **Új játék** gomb (ha még nem volt dobás, letiltva).

**Fontos:** a state-ben **csak a dobások tömbje** legyen. Az összeg, átlag, darabszám mind ebből **számolható**.

**Tippek**
- Véletlen 1–6: `Math.floor(Math.random() * 6) + 1`
- Új elem a tömb elejére: `[uj, ...dobasok]`
- Határok közé szorítás: `Math.min(MAX, Math.max(MIN, ertek))`

---

## 4. feladat – Átváltó ★★

**Mappa:** `feladatok/04-atvalto/src/App.jsx`

A backend 3. feladatának (Átváltó) React változata: itt nincs szerver, minden a böngészőben számolódik, **gépelés közben**.

**a) Hőmérséklet** – két mező: °C és °F. Bármelyikbe írsz, a másik azonnal frissül (1 tizedesjegyre).

| Beírod | Másik mező |
|---|---|
| °C: `25` | °F: `77` |
| °F: `100` | °C: `37.8` |
| °C: (üres) | °F: (üres) |

A mezők mellett: ≤ 0 °C `🧊 fagy`, ≥ 30 °C `🔥 kánikula`, ≥ 100 °C `♨️ forr`.

> **A trükk:** ne tárolj két state-et! Elég azt tárolni, amit a felhasználó utoljára beírt: `{ ertek: '25', egyseg: 'c' }`. A másik mező értéke ebből **számolható**. (Két state esetén könnyen ellentmondásba kerülnek.)

**b) Pénzváltó** – forint mező + valuta legördülő (EUR, USD, GBP):
`10 000 Ft = 25.00 EUR`. Üres vagy negatív összegnél: `Adj meg egy nem negatív összeget!` Alul: `1 EUR = 400 Ft · 1 USD = 360 Ft · 1 GBP = 470 Ft`.

**c) BMI** – súly (kg) és magasság (cm): `BMI: 22.9 (normál)`, a kategória színesen.
Kategóriák: < 18,5 *sovány*, < 25 *normál*, < 30 *túlsúlyos*, egyébként *elhízott*. Amíg valamelyik mező üres vagy nem pozitív: `Add meg a súlyodat és a magasságodat.`

**Tippek**
- Az input értéke **szöveg**: `Number(...)`. Üres mezőnél a `Number('')` **0** – ezt külön kell kezelni!
- Két tizedes: `szam.toFixed(2)`. Az objektum kulcsai a legördülőhöz: `Object.keys(ARFOLYAMOK)`.

---

## 5. feladat – Regisztrációs űrlap ★★★

**Mappa:** `feladatok/05-regisztracio/` (`src/ellenorzes.js` + `src/App.jsx`)

**a) Ellenőrző függvények** (`ellenorzes.js`) – React nélküli, „tiszta” függvények.

| Mező | Szabály | Hibaüzenet |
|---|---|---|
| `felhasznalonev` | 4–20 karakter, csak angol betű, szám, `_` | `4–20 karakter, csak angol betű, szám és _ lehet.` |
| `email` | érvényes formátum | `Érvénytelen e-mail cím.` |
| `jelszo` | min. 8 karakter | `Legalább 8 karakter legyen.` |
| | van benne nagybetű és szám | `Legyen benne nagybetű és szám is.` |
| `jelszo2` | egyezik a jelszóval | `A két jelszó nem egyezik.` |
| `szuletes` | kötelező | `Add meg a születési dátumot.` |
| | legalább 14 éves (születésnapot is figyelve!) | `Legalább 14 évesnek kell lenned.` |
| `nem` | kötelező | `Válassz egyet.` |
| `aszf` | be kell pipálni | `A regisztrációhoz el kell fogadnod a feltételeket.` |

Az `ellenoriz(adat)` egy objektumot ad vissza, amelyben **csak a hibás mezők** szerepelnek: `{ jelszo2: 'A két jelszó nem egyezik.' }`.
A `jelszoErosseg(jelszo)` 0–4 pontot ad (egy-egy pont: hossz ≥ 8, hossz ≥ 12, kis- és nagybetű, szám, speciális karakter; max. 4).

**b) Az űrlap** (`App.jsx`)

- Mezők: felhasználónév, e-mail, jelszó, jelszó újra, születési dátum (`type="date"`), nem (3 rádiógomb: *nő, férfi, nem adom meg*), ÁSZF checkbox.
- A jelszó alatt **erősségjelző sáv**: a szélessége és a színe az erősségtől függ, alatta szövegesen (`gyenge`, `erős` …).
- A hibaüzenet **ne jelenjen meg rögtön**, csak ha a felhasználó már **kilépett a mezőből** (`onBlur`), vagy megnyomta a **Regisztrálok** gombot. A hibás mező kerete piros.
- Ha a beküldés után még van hiba, a gomb letiltva, amíg ki nem javítja.
- Sikeres beküldés után az űrlap helyén: `✔ Sikeres regisztráció! Üdv, minta_mate! ...` és egy **Új regisztráció** gomb, ami mindent alaphelyzetbe állít.

**Fontos:** a hibákat **ne** tárold state-ben! Minden rendereléskor számold ki: `const hibak = ellenoriz(adat);`

**Tippek**
- Rádiógomb: `checked={adat.nem === 'nő'}`, mindháromnak ugyanaz a `name`.
- Nagybetű vizsgálata ékezettel: `/[A-ZÁÉÍÓÖŐÚÜŰ]/`
- `Object.keys(hibak).length === 0` → nincs hiba.

---

## 6. feladat – Bevásárlólista ★★★

**Mappa:** `feladatok/06-bevasarlolista/` · **Mintapélda:** `05-komponens-kommunikacio`

Bontsd az alkalmazást komponensekre! A state (a tételek tömbje) az `App`-ban van, a gyerekek **callback** függvényekkel jelzik, mi történt.

| Komponens | Props | Feladata |
|---|---|---|
| `UjTetel` | `onHozzaad(uj)` | név + mennyiség (1–99) + kategória legördülő; hibás bevitelnél üzenet; beküldés után ürül |
| `Tetel` | `tetel`, `onModosit(id, valtozas)`, `onTorol(id)` | pipa (megvéve), név, `−` / `+` gomb (1–99 között), törlés gomb |
| `Osszesito` | `tetelek`, `onMegvettekTorlese()` | `5 tétel (14 db) · megvéve: 2 · 40%`, zöld haladásjelző sáv, 100%-nál `🎉 Minden megvan!`, **Megvásároltak törlése** gomb |

**Követelmények**
- A lista **kategóriánként** csoportosítva jelenik meg (a `kategoriak.js` sorrendjében, ikonnal). Üres kategória ne jelenjen meg.
- Egy kategórián belül a **még meg nem vett** tételek elöl, azon belül ábécérendben.
- A megvett tétel áthúzva, halványan.
- A név kisbetűsítve, szóközök nélkül kerül a listába. Ha **ugyanabban a kategóriában** már van ilyen nevű tétel, ne új sor jöjjön létre, hanem nőjön a meglévő mennyisége (és legyen újra „nem megvett”).

**Tippek**
- Egy elem módosítása: `tetelek.map(t => t.id === id ? { ...t, ...valtozas } : t)`
- Rendezés logikai érték szerint: `a.megvett - b.megvett` (a `false` 0, a `true` 1). Másodlagos rendezés: `|| a.nev.localeCompare(b.nev, 'hu')`.
- A `sort` helyben rendez – előbb másolj: `[...lista].sort(...)`.
- Egyedi id: `Date.now()`.

---

**Tovább:** [2. rész – hookok, adatbetöltés, router, context](FELADATOK-2.md)

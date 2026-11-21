# React gyakorló feladatok – 2. rész: hookok, adatbetöltés, router, context

**Általános tudnivalók:** lásd [FELADATOK.md](FELADATOK.md). Ebben a részben még **nem kell** szerver – az adatok a `public/` mappából vagy JS fájlból jönnek.

| # | Feladat | Téma | Nehézség | Indítás | Mintapélda |
|---|---|---|---|---|---|
| 7 | Filmkereső | `useEffect` + `fetch`, betöltés / hiba, szűrés, rendezés | ★★★ | `npm run f07` | 06 |
| 8 | Stopper és visszaszámláló | időzítő, takarító függvény, `document.title` | ★★★ | `npm run f08` | 06 |
| 9 | Kvíz | több lépéses állapot, számított állapot, komponensek | ★★★ | `npm run f09` | 03, 05 |
| 10 | Jegyzetek | `localStorage`, **saját hook**, szerkesztés helyben | ★★★ | `npm run f10` | 05, 06 |
| 11 | Receptkönyv | React Router, `useParams`, `useSearchParams`, `key` trükk | ★★★ | `npm run f11` | 07 |
| 12 | Webshop kosárral | Context + Router, `navigate` state-tel | ★★★★ | `npm run f12` | 07, 09 |
| 13 | Javítsd ki! | 12 tipikus React hiba megkeresése | ★★★ | `npm run f13` | 01–06 |

---

## 7. feladat – Filmkereső ★★★

**Mappa:** `feladatok/07-filmkereso/` · **Adatok:** `public/filmek.json` → `fetch('/filmek.json')`

**a) Betöltés:** amíg tölt: `Betöltés...`; hibánál (pl. írd át a címet `/nincs.json`-ra): `Nem sikerült betölteni a filmeket: HTTP 404`.

**b) Szűrő sáv** (egymással **kombinálhatók**):

| Szűrő | Elem | Működés |
|---|---|---|
| Cím vagy rendező | szövegmező | részleges, kisbetű-nagybetű független (`nolan` → 3 film) |
| Műfaj | legördülő | `mind` + a filmekből kigyűjtött egyedi műfajok ábécérendben |
| Min. értékelés | csúszka (`type="range"`, 0–10, lépés 0,5) | a címkében az aktuális érték: `Min. értékelés: 8.5` |
| Rendezés | legördülő | `Cím (A–Z)`, `Legújabb elöl`, `Legjobb elöl` |
| **Szűrők törlése** | gomb | minden visszaáll alaphelyzetbe |

Alatta: `5 / 12 film`. Ha nincs találat: `Nincs a feltételeknek megfelelő film.`

**c) Részletek:** egy filmre kattintva mellette (jobb oldalt) megjelenik a részletes adatlap (leírás, rendező, év, műfaj, hossz `2 óra 28 perc` formában, értékelés) és egy **Bezár** gomb. Az újbóli kattintás is bezárja. A kiválasztott kártya kerete kék.

**Fontos:** a szűrt lista, a műfajok listája és a kiválasztott film **számított értékek** – state-ben csak a filmek, a szűrők és a kiválasztott **id** legyen.

**Tippek**
- A szűrők egy objektumban: `{ kereses: '', mufaj: '', min: 0, rendezes: 'cim' }`, egy közös `onChange` kezelővel (`name` attribútum).
- A rendezésekhez készíts egy objektumot: `{ cim: { felirat, fv: (a, b) => ... }, ... }` – így a legördülő is ebből generálható.
- Két hasábos elrendezés: `display: 'grid', gridTemplateColumns: '1fr 1fr'`.

---

## 8. feladat – Stopper és visszaszámláló ★★★

**Mappa:** `feladatok/08-stopper/src/App.jsx`

**a) `formaz(ms)` függvény:** `75300` → `01:15.3` (kétjegyű perc és másodperc, utána tized).

**b) Stopper**
- Nagy kijelző: `00:00.0`. Egyetlen gomb, aminek a felirata: `Indít` → `Megállít` → `Folytat`.
- **Kör** gomb (csak futás közben): rögzíti az időt. Táblázat: `#`, `Köridő` (az előző körhöz képest), `Összesen`. Legalább két kör esetén a **leggyorsabb** kör sora zöld.
- **Nullázás**: megáll, 0-ra áll, a körök törlődnek.
- Az időzítő **csak futás közben** létezzen: a `useEffect` függjön a `fut` state-től, és a takarító függvény állítsa le!

**c) Visszaszámláló**
- Indítás előtt: perc és másodperc mező (alapból 1:30). Érvénytelen bevitelnél (0 idő, 59-nél nagyobb másodperc) hibaüzenet, a gomb letiltva.
- Indítás után a mezők helyén nagy számokkal a hátralévő idő (`01:29`); az utolsó **10 másodpercben piros**.
- 0-nál magától megáll: `⏰ Lejárt az idő!`
- Gombok: `Indít` / `Szünet` / `Folytat`, `Visszaállít`.
- A **böngészőfül címe** mutassa a hátralévő időt (`⏳ 01:29`), lejáratkor `⏰ Lejárt!`. Ez egy **külön** `useEffect`, ami a hátralévő időtől függ.

**Tippek**
- `String(5).padStart(2, '0')` → `"05"`
- Az időzítőben **mindig** függvényes frissítést használj: `setEltelt(e => e + 100)`. Miért? Próbáld ki `setEltelt(eltelt + 100)`-zal!
- A `set...` függvénynek átadott frissítő függvényben ne hívj másik `set...`-et. Ha 0-nál meg kell állni, arra írj egy külön effektet.

---

## 9. feladat – Kvíz ★★★

**Mappa:** `feladatok/09-kviz/` · **Kérdések:** `src/kerdesek.js` (a `helyes` a jó válasz **indexe**)

| Állapot | Mit látunk? |
|---|---|
| kezdés | cím, `8 kérdés vár rád.`, **Kezdés** gomb |
| kérdés | `3. kérdés / 8 · Pontszám: 2`, haladásjelző sáv, a kérdés kártyája, **Következő →** gomb (az utolsónál **Eredmény**) |
| vége | `Eredmény: 6 / 8 (75%)`, szöveges értékelés, az összes kérdés a saját válaszoddal (✔ / ✘) és a helyessel, **Új játék** gomb |

**A kérdés kártyája** (`KerdesKartya` – props: `kerdes`, `valasztott`, `onValaszt`)
- A válaszok gombokként, betűjellel: `A) useEffect`, `B) useState` …
- Választás után **minden** gomb letiltva, a helyes zöld, a rosszul választott piros, a többi halvány. Alatta: `✔ Helyes!` vagy `✘ Rossz válasz. A helyes: useState`.
- A **Következő** gomb csak válaszadás után aktív.

**Követelmények**
- A `kever(tomb)` függvény (Fisher–Yates) minden játék elején **új sorrendet** ad, és **nem módosítja** az eredeti tömböt.
- Értékelés: 100% `🏆 Hibátlan!`, ≥ 75% `🎉 Szép munka!`, ≥ 50% `🙂 Nem rossz…`, alatta `📚 Érdemes átnézni a mintapéldákat.`
- **Ne legyen külön „állapot” state** (`'kezdes' | 'kerdes' | 'vege'`)! Számold ki abból, hány kérdés van és hány válasz van már.

**Tippek**
- Fisher–Yates: hátulról haladva minden elemet cserélj egy előtte lévő (vagy önmaga) véletlen elemmel: `[t[i], t[j]] = [t[j], t[i]]`.
- Betűjel: `String.fromCharCode(65 + i)` → `A`, `B`, `C` …

---

## 10. feladat – Jegyzetek ★★★

**Mappa:** `feladatok/10-jegyzetek/`

**a) Saját hook:** `useLocalStorage(kulcs, kezdoErtek)` – ugyanúgy használható, mint a `useState`, de az értéket `localStorage`-ba menti, és induláskor onnan tölti be. Hibás JSON esetén se omoljon össze (próbáld ki: F12 → Application → Local Storage → írd át az értéket `{`-re).

**b) Az alkalmazás**
- **Új jegyzet** űrlap: cím (kötelező), szöveg, szín (5 kis színes négyzet, a kiválasztott vastag kerettel). Az űrlap háttere a választott szín.
- A jegyzetek kártyákon (`.racs`), a kártya háttere a jegyzet színe; a szöveg sortörései megmaradnak (`white-space: pre-wrap`); alul a módosítás ideje (`2026. 11. 09. 14:32`).
- 📍 / 📌 gomb: **kitűzés**. A kitűzött jegyzetek mindig elöl vannak, narancs kerettel.
- **Szerkeszt**: a kártya helyén ugyanaz az űrlap jelenik meg kitöltve, **Mentés** és **Mégse** gombbal. (Ugyanazt a `JegyzetUrlap` komponenst használd az új jegyzethez és a szerkesztéshez is!)
- **Töröl**: megerősítés után.
- Keresés címben és szövegben; `3 / 7 jegyzet · 2 kitűzve`.
- Sorrend: kitűzöttek elöl, azon belül a **legutóbb módosított** elöl.
- Frissítés (F5) után minden megmarad.

**Tippek**
- Egy jegyzet: `{ id, cim, szoveg, szin, kituzve, letrehozva, modositva }` – az időpontok `Date.now()` értékek.
- Rendezés két szempont szerint: `b.kituzve - a.kituzve || b.modositva - a.modositva`
- Az űrlap kezdőértéke a propból: `useState(kezdo?.cim ?? '')`.

---

## 11. feladat – Receptkönyv ★★★

**Mappa:** `feladatok/11-receptek/` · **Adatok:** `src/receptek.js` · **Mintapélda:** `07-router`

| Útvonal | Oldal | Tartalom |
|---|---|---|
| `/` | Főoldal | `Mit főzzünk ma?` – egy véletlen recept linkje (idő, nehézség), **🎲 Másikat kérek** gomb (sosem ugyanazt adja) |
| `/receptek` | Receptek | szűrők + receptkártyák (kattintható linkek) |
| `/receptek/:id` | Recept részletei | lásd lent |
| bármi más | 404 | `A(z) /xyz oldal nem létezik.` + link a főoldalra |

A menü: **Főoldal**, **Összes recept**, **Levesek** (`/receptek?kategoria=leves`), **Desszertek** – `NavLink`-kel.

**Receptek oldal** – a szűrők az **URL-ben** tárolódjanak (`useSearchParams`), így a szűrt oldal linkje megosztható, és a Vissza gomb is működik:
- `?kereses=` – a recept nevében **vagy** a hozzávalók nevében keres (`tojás` → a tojásos receptek),
- `?kategoria=` – legördülő, `?maxIdo=` – `max. 30 perc` / `max. 1 óra`,
- egy paraméter módosítása **ne törölje** a többit; **Szűrők törlése** gomb.
- Címsor: `Levesek (2)` vagy `Összes recept (6)`.

**Recept részletei**
- `← Vissza` gomb (`navigate(-1)`), a kategória linkként a szűrt listára.
- **Adagszám-váltó** (`−` / `+`, 1–20): a hozzávalók mennyisége arányosan változik, egy tizedesre, tizedesvesszővel (`2,7 db tojás`).
- A lépések **kipipálhatók** (kattintásra áthúzva), címsor: `Elkészítés (2/4)`; ha mind kész: `🍽️ Jó étvágyat!`
- Lent: `← előző recept` és `következő recept →` linkek (körbe: az utolsó után az első jön).
- Nem létező id: `Nincs ilyen recept` + link.

> **Figyelj!** Ha a „következő recept” linkre kattintasz, a React **ugyanazt** a komponenst használja tovább, csak az `id` változik – így az adagszám és a kipipált lépések **megmaradnak** az előző receptből! Próbáld ki, majd javítsd: egy csomagoló komponens adja tovább az `id`-t **`key`-ként** is: `<ReceptReszlet key={id} id={id} />`.

**Tippek**
- Paraméter módosítása a többi megtartásával: `const uj = new URLSearchParams(params); uj.set(kulcs, ertek); setParams(uj);`
- Körbe léptetés: `(index + 1) % hossz`, visszafelé `(index - 1 + hossz) % hossz`.

---

## 12. feladat – Webshop kosárral ★★★★

**Mappa:** `feladatok/12-webshop-kosar/` · **Mintapéldák:** `07-router`, `09-context`

**a) `KosarContext`** – a state-ben csak `[{ id, db }]` legyen; a termék többi adatát a `TERMEKEK`-ből keresd ki. A `useKosar()` által adott értékek listáját a fájl fejléce tartalmazza. Szabályok:
- egy termékből legfeljebb annyi lehet a kosárban, amennyi a **készlet**,
- ha a darabszám 0-ra csökken, a termék **kikerül** a kosárból,
- szállítás: 1490 Ft, de **20 000 Ft felett ingyenes**.

**b) Oldalak**

| Útvonal | Tartalom |
|---|---|
| `/` | termékkártyák (emoji kép, név linkként, ár), **Kosárba** gomb |
| `/termekek/:id` | részletek, készlet, **Kosárba** gomb |
| `/kosar` | táblázat: termék, egységár, `−` db `+`, összesen, ✕; részösszeg, szállítás (`még 4 510 Ft és ingyenes`), **Fizetendő**; **Kosár ürítése**, **Tovább a pénztárhoz →**. Üres kosárnál: `A kosarad üres` + link |
| `/penztar` | név, e-mail, cím, fizetési mód (rádió); hibás kitöltésnél üzenet; **Megrendelem** → kosár ürítése → `/koszonjuk` |
| `/koszonjuk` | `🎉 Köszönjük a rendelést, Anna!`, rendelésszám (`TB-123456`), darabszám, végösszeg |

**c) Kosárba gomb** – egy közös `KosarGomb` komponens mindkét oldalon:
`Kosárba` → `Kosárban: 2 · +1` → a készlet elérésekor `Kosárban: 3 (max.)` letiltva; nulla készletnél `Elfogyott`.

**d) Menü:** a 🛒 **Kosár** mellett piros körben az összes darabszám (ha nem 0).

**e) Védelem:** üres kosárral a `/penztar` irányítson át a `/kosar`-ra; a `/koszonjuk` közvetlen megnyitása (rendelés nélkül) a főoldalra.

**Szorgalmi:** a kosár maradjon meg frissítés után is (`localStorage`).

**Tippek**
- Adat átadása a következő oldalnak: `navigate('/koszonjuk', { state: rendeles })`, ott: `const { state } = useLocation();`
- Átirányítás rendereléskor: `return <Navigate to="/kosar" replace />;`
- **Csapda:** a **Megrendelem** gombnál a kosár ürítése után a Pénztár oldal még egyszer újrarenderelődik – üres kosárral! –, mielőtt a `/koszonjuk`-ra érnél, és az (e) pont szabálya a `/kosar`-ra dobna. Egy `leadva` state-tel jelezd, hogy épp most adtad le a rendelést.

---

## 13. feladat – Javítsd ki! ★★★

**Mappa:** `feladatok/13-javitsd/src/App.jsx`

Az osztálykirándulás befizetéseit nyilvántartó alkalmazásban **12 hiba** van – mindegyik egy tipikus kezdő React hiba az 1–12. feladat anyagából. Keresd meg és javítsd mindet!

**Így működne helyesen:**
- Betöltéskor a diákok listája **egyszer** töltődik le.
- Befizetéskor a kiválasztott diák befizetése az összeggel nő (számként!), az oldal nem töltődik újra, megjelenik `5000 Ft befizetve.`
- **Nullázás**: a diák befizetése azonnal 0 lesz. **Törlés**: a diák kikerül a listából.
- **Csak a tartozók** be- és kikapcsolható. **Névsorba rendezés** / **Eredeti sorrend** váltogatható.
- Az óra másodpercenként **egyet** lép.
- Ha senki sem tartozik, a tartozókról szóló sor egyszerűen nem jelenik meg.

**Leadandó:** a javított `App.jsx`, és mellé egy `HIBAK.md`, benne táblázatban: hol volt a hiba, mi volt a **tünet**, mi a javítás és **miért** volt hiba.

**Tippek**
- Ha fehér az oldal, nézd a konzolt – a React megmondja, mi a baj.
- F12 → **Network** fül: hány kérés megy ki a `diakok.json`-ra?
- Próbálj ki minden gombot **többször** és **különböző sorrendben** (pl. kapcsold be a „Csak a tartozók”-at, és fizess be mindenkinek).

---

**Vissza:** [1. rész](FELADATOK.md) · **Tovább:** [3. rész – backend, bejelentkezés, szerepkörök](FELADATOK-3.md)

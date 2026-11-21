# React példák és feladatok – lépésről lépésre

Az első komponenstől a több szerepkörű, backendhez kapcsolódó alkalmazásig.
Technológia: **React 19**, **Vite**, **React Router**; a 3. részhez egy gyakorló **Express API** (a `szerver/` mappában).

## Első indítás

```bash
npm install
npm run 01
```

A böngésző magától megnyílik a **http://localhost:5173** címen. Leállítás: `Ctrl + C`. Mentéskor az oldal azonnal frissül.
Egyszerre csak egy React alkalmazás futhat (mind az 5173-as portot használja).

## Mintapéldák

| # | Mappa | Téma | Indítás |
|---|---|---|---|
| 01 | [`01-elso-komponens`](01-elso-komponens/README.md) | Projekt létrehozása, JSX, komponens, kifejezések `{ }` | `npm run 01` |
| 02 | [`02-props-listak`](02-props-listak/README.md) | Props, `children`, listák `map` + `key`, feltételes megjelenítés | `npm run 02` |
| 03 | [`03-state-esemenyek`](03-state-esemenyek/README.md) | `useState`, események, tömb és objektum frissítése | `npm run 03` |
| 04 | [`04-urlapok`](04-urlapok/README.md) | Vezérelt mezők, ellenőrzés, beküldés | `npm run 04` |
| 05 | [`05-komponens-kommunikacio`](05-komponens-kommunikacio/README.md) | Komponensekre bontás, state felemelése, callback propok | `npm run 05` |
| 06 | [`06-useeffect-fetch`](06-useeffect-fetch/README.md) | `useEffect`, `fetch`, betöltés / hiba, takarítás, `localStorage` | `npm run 06` |
| 07 | [`07-router`](07-router/README.md) | React Router: oldalak, `useParams`, `useNavigate`, `useSearchParams` | `npm run 07` |
| 08 | [`08-api-crud`](08-api-crud/README.md) | Kommunikáció a backenddel: GET, POST, DELETE, Vite proxy | `npm run szerver` + `npm run 08` |
| 09 | [`09-context`](09-context/README.md) | Context: közös adat props nélkül, saját hook | `npm run 09` |
| 10 | [`10-bejelentkezes`](10-bejelentkezes/README.md) | **Hitelesítés**: AuthContext, JWT token, védett útvonal, 401 | `npm run szerver` + `npm run 10` |
| 11 | [`11-szerepkorok`](11-szerepkorok/README.md) | **Jogosultságkezelés**: szerepkörök, `jogok.js`, feltételes UI, 403 | `npm run szerver` + `npm run 11` |

## Feladatok

| Rész | Leírás | Feladatok | Indítás |
|---|---|---|---|
| 1. | [Alapok](feladatok/FELADATOK.md) – JSX, props, state, űrlapok, komponensek | 1–6. | `npm run f01` … `f06` |
| 2. | [Hookok, adatbetöltés, router, context](feladatok/FELADATOK-2.md) | 7–13. | `npm run f07` … `f13` |
| 3. | [Backend, bejelentkezés, szerepkörök](feladatok/FELADATOK-3.md) – záró projekt | 14–20. | `npm run szerver` + `npm run f14` … `f20` |

A kiinduló kódok a `feladatok/` mappában vannak, `TODO` megjegyzésekkel.

## Gyakorló API szerver

```bash
npm run szerver         # http://localhost:3000
npm run szerver-30mp    # ugyanaz, de a token 30 mp alatt lejár (401 teszteléséhez)
npm run szerver-reset   # az eredeti adatok visszaállítása
```

- Az adatokat JSON fájlokban tárolja (`szerver/data/`), nem kell hozzá MySQL.
- A végpontok felépítése megegyezik a backend órán készült `09-authorization` példáéval (`/api/auth/...`, `{ hiba }`, `{ hibak: [...] }`, 401 / 403 / 409).
- A frontend a Vite **proxyn** keresztül éri el (`vite.config.js`): a `/api/...` kérések a 3000-es portra mennek.
- Mintafelhasználók (mindegyik jelszava **`Jelszo123`**):

| E-mail | Szerepkör | Használja |
|---|---|---|
| `olvaso@konyvtar.hu` | user | 10, 11, 18–19 |
| `konyvtaros@konyvtar.hu` | librarian | 11, 18–19 |
| `admin@konyvtar.hu` | admin | 11, 18–19 |
| `diak@iskola.hu`, `diak2@iskola.hu` | diak | 16–17, 20 |
| `tanar@iskola.hu`, `tanar2@iskola.hu` | tanar | 16–17, 20 |
| `admin@iskola.hu` | admin | 16–17, 20 |

## Hogyan működik a közös projekt?

Minden példa és feladat egy önálló React alkalmazás (`index.html` + `src/main.jsx` + `src/App.jsx`), de **egy közös** `package.json`-t és `node_modules`-t használnak, így elég egyszer telepíteni. A scriptek csak megmondják a Vite-nak, melyik mappát indítsa:

```json
"01": "vite 01-elso-komponens --config vite.config.js"
```

Saját, önálló projektet (pl. a vizsgaremekhez) az `npm create vite@latest` paranccsal hozz létre – lásd a [01-es példa README-jét](01-elso-komponens/README.md).

## Ajánlott VS Code bővítmények

- [**ES7+ React/Redux/React-Native snippets**](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets) – `rfc` + Tab → kész komponens váz
- **REST Client** vagy **Bruno** – a szerver végpontjainak kipróbálásához
- Böngészőbe: **React Developer Tools** (Chrome / Firefox) – a komponensfa, a props és a state megtekintése

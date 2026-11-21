# 07 – React Router (több oldal)

**Indítás:** `npm run 07` · **Csomag:** `react-router` (saját projektben: `npm install react-router`)

## Mit mutat be a példa?

| Elem | Mire való? |
|---|---|
| `<BrowserRouter>` | Az egész alkalmazást körbeveszi, figyeli a címsort. |
| `<Routes>` / `<Route path element>` | Melyik útvonalhoz melyik komponens tartozik. |
| `<Route index>` | A szülő útvonal alapoldala (`/`). |
| `<Route path="*">` | Minden más → 404 oldal. |
| Szülő `<Route element={<Elrendezes />}>` + `<Outlet />` | Közös keret (menü, lábléc) minden oldalnak. |
| `<Link to>` / `<NavLink to>` | Hivatkozás oldal-újratöltés nélkül; a NavLink `active` osztályt kap. |
| `useParams()` | Útvonal-paraméter: `/tantargyak/:id` → `{ id: '3' }`. |
| `useNavigate()` | Navigálás kódból: `navigate('/')`, `navigate(-1)`. |
| `useSearchParams()` | Query string olvasása / írása: `?evfolyam=13`. |
| `useLocation()` | Az aktuális cím (`pathname`). |

## Mappaszerkezet

```
src/
├── App.jsx              ← útvonalak
├── adatok.js
├── components/
│   └── Elrendezes.jsx   ← menü + <Outlet />
└── pages/               ← egy fájl = egy oldal
    ├── Fooldal.jsx
    ├── Tantargyak.jsx
    ├── TantargyReszlet.jsx
    ├── Rolunk.jsx
    └── NemTalalhato.jsx
```

## Mire figyelj?

- **Ne használj `<a href>`-et** az alkalmazáson belüli linkekhez: újratöltené az oldalt, és **elveszne minden state**.
- A `useParams()` értékei **szövegek**: `t.id === Number(id)`.
- A főoldal `NavLink`-jére kell az `end`, különben minden oldalon aktív lenne (hiszen minden cím `/`-rel kezdődik).
- Éles szerveren (Apache, Nginx) be kell állítani, hogy minden ismeretlen címre az `index.html`-t adja vissza, különben a `/tantargyak/3` közvetlen megnyitása 404-et ad. A Vite fejlesztői szervere ezt magától tudja.

## Próbáld ki

1. Nyisd meg közvetlenül a http://localhost:5173/tantargyak/2 címet, majd a `/tantargyak/99`-et és a `/valami`-t.
2. Szűrj évfolyamra, majd nyomd meg a böngésző Vissza gombját.
3. Készíts egy `/tanarok` oldalt, ami a tanárok neveit sorolja fel egyedien (`new Set(...)`).

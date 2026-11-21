# 11 – Szerepkörök és jogosultságok a frontenden

**Indítás két terminálban:** `npm run szerver` és `npm run 11` · **Backend párja:** `backend/express-peldak/09-authorization`

A 10-es példa arra válaszolt: **„Ki vagy?”** Ez a példa arra: **„Mit láthatsz és mit tehetsz?”**

| | user | librarian | admin |
|---|---|---|---|
| Könyvek listája | ✔ | ✔ | ✔ |
| Új könyv űrlap | – | ✔ | ✔ |
| Törlés gomb | – | – | ✔ |
| Felhasználók oldal | – | – | ✔ |

## Mi új a 10-es példához képest?

| Fájl | Mit csinál? |
|---|---|
| `jogok.js` | **Egy helyen** megadja, melyik szerepkör milyen jogokkal bír (`konyv:torol` …). |
| `AuthContext.jsx` | Új függvény: `jogosult('konyv:torol')` → `true` / `false`. |
| `components/VedettUtvonal.jsx` | Új `jog` prop: bejelentkezve, de jog nélkül → „Nincs jogosultságod” oldal. |
| `components/Jogosult.jsx` | Gombok, menüpontok, űrlapok **feltételes megjelenítése**. |
| `pages/Felhasznalok.jsx` | Admin oldal: szerepkör módosítása `PATCH` kéréssel. |

## Szerepkör vagy jogosultság?

```jsx
// ❌ szerepkört kérdezünk – ha jön egy "moderator", MINDEN ilyen sort át kell írni
{felhasznalo.szerepkor === 'admin' && <button>Törlés</button>}

// ✅ jogot kérdezünk – új szerepkörnél csak a jogok.js változik
<Jogosult jog="konyv:torol"><button>Törlés</button></Jogosult>
```

## Mire figyelj?

- **Az elrejtés nem védelem!** A gomb eltüntetése csak kényelmi funkció. Ha egy olvasó kézzel elküldi a `DELETE` kérést (pl. a konzolból), a **szervernek** kell 403-at adnia. A frontend és a backend jogosultsági táblázatának egyeznie kell.
- **401 vs. 403 a frontenden**: 401 → ki kell jelentkeztetni / bejelentkezésre küldeni; 403 → üzenet, hogy nincs joga (újra bejelentkezni felesleges).
- **A szerepkör a tokenben van.** Ha az admin megváltoztatja valaki szerepkörét, az illető csak **újbóli bejelentkezés után** kap új jogokat (a frontenden a `localStorage`-ban is a régi szerepkör van).

## Próbáld ki

1. Lépj be olvasóként, és a konzolból (F12) küldj törlési kérést:
   ```js
   const { token } = JSON.parse(localStorage.auth);
   await fetch('/api/konyvek/1', { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }).then(r => r.status)
   ```
2. Adminként léptesd elő az olvasót könyvtárossá. Mit lát az olvasó, amíg újra be nem jelentkezik?
3. Próbálj adminként törölni egy kikölcsönzött könyvet (409).

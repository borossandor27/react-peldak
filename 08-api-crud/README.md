# 08 – Kommunikáció a backenddel (CRUD)

**Indítás két terminálban:** `npm run szerver` és `npm run 08`

## Hogyan jut el a kérés a szerverig?

```
Böngésző (localhost:5173)                Vite fejlesztői szerver              Gyakorló API (localhost:3000)
fetch('/api/termekek')   ─────────────►  proxy: /api → localhost:3000  ────►  GET /api/termekek
```

A `vite.config.js`-ben beállított **proxy** miatt a böngésző azt hiszi, hogy a frontend és az API ugyanarról a címről jön, ezért **nincs CORS hiba**, és a címben nem kell kiírni a portot.

> A saját Express backendeddel is működik: állítsd le a gyakorló szervert, és indítsd el a sajátodat a 3000-es porton. Ha a végpontjaid nem `/api`-val kezdődnek, vagy proxy nélkül dolgozol, a backendben a `cors` csomag kell: `app.use(cors())`.

## Mit mutat be a példa?

- **Betöltés** `useEffect`-ben, három állapottal (betöltés / hiba / adat).
- **Közös `keres` függvény** (`api.js`): JSON küldése, `Content-Type` fejléc, **204** kezelése, a szerver hibaüzenetének kiolvasása.
- **Létrehozás** (POST): a szerver által visszaadott objektumot (benne az új `id`-val) tesszük a state-be.
- **Törlés** (DELETE): megerősítés után, siker esetén `filter`-rel kivesszük a listából.
- **Szerveroldali ellenőrzés** megjelenítése: a 400-as válasz `hibak` tömbje az űrlap alatt.
- **Dupla küldés elleni védelem**: a gomb a kérés idejére letiltva.

## A frissítés két módja

| | Hogyan? | Előny | Hátrány |
|---|---|---|---|
| **Helyi frissítés** (ebben a példában) | a válasz alapján módosítjuk a state-et | gyors, nincs plusz kérés | ha más is módosít, nem látjuk |
| **Újratöltés** | minden művelet után újra lekérjük a listát | mindig a szerver állapotát mutatja | plusz kérés |

## Mire figyelj?

- Az űrlap szöveget ad, a szerver **számot** vár: `Number(adat.ar)`.
- A `fetch` 400-nál és 500-nál **nem dob kivételt** – ezt a `valasz.ok` vizsgálatával nekünk kell megtenni.
- 204-es válasznál nincs törzs: a `.json()` hibát dobna.
- Ha a szerver nem fut, a proxy **500**-at ad, vagy hálózati hiba lesz – írj érthető üzenetet a felhasználónak.

## Próbáld ki

1. Állítsd le a szervert (`Ctrl + C`), és frissítsd az oldalt.
2. Küldj el üres űrlapot – milyen üzeneteket ad a szerver?
3. F12 → Hálózat fül: nézd meg a kérések metódusát, törzsét és a válasz státuszkódját.
4. Az eredeti adatok visszaállítása: `npm run szerver-reset`.

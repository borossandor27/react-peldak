# 10 – Bejelentkezés (hitelesítés a frontenden)

**Indítás két terminálban:** `npm run szerver` és `npm run 10` · **Backend párja:** `backend/express-peldak/08-authentication`

Próbafiókok (jelszó mindenhol `Jelszo123`): `olvaso@konyvtar.hu`, `konyvtaros@konyvtar.hu`, `admin@konyvtar.hu`

## A folyamat

```
1. Bejelentkezes oldal  ── POST /api/auth/bejelentkezes { email, jelszo } ──►  szerver
2.                      ◄── { token, felhasznalo } ───────────────────────────
3. AuthContext: setAuth(adat) + localStorage
4. Védett kérés         ── GET /api/konyvek   Authorization: Bearer <token> ──►
5. Ha 401 jön vissza (lejárt token) → automatikus kijelentkezés
```

## Mappaszerkezet

```
src/
├── api.js                     ← keres(url, { method, body, token })
├── context/AuthContext.jsx    ← felhasznalo, bejelentkezes(), kijelentkezes(), apiKeres()
├── components/
│   ├── Menu.jsx               ← bejelentkezve más menüt mutat
│   └── VedettUtvonal.jsx      ← nincs bejelentkezve → <Navigate to="/bejelentkezes" />
└── pages/
    ├── Bejelentkezes.jsx
    ├── Konyvek.jsx
    └── Profil.jsx
```

## Mit mutat be a példa?

- **AuthContext**: a bejelentkezés állapota az egész alkalmazásban elérhető (`useAuth()`).
- **Perzisztencia**: `localStorage` – frissítés után is bejelentkezve maradunk.
- **Tokenes kérés**: `Authorization: Bearer <token>` fejléc az `apiKeres`-ben.
- **Védett útvonal**: egy „layout” route (`<VedettUtvonal />` + `<Outlet />`), ami átirányít, ha nincs felhasználó.
- **Visszairányítás**: a `<Navigate state={{ honnan }}>` megjegyzi, honnan jöttünk; belépés után oda megyünk vissza.
- **`useCallback`**: az `apiKeres` függvény csak akkor jön létre újra, ha a token változik – így a `useEffect` függőségei közé tehető.
- **401 kezelése**: lejárt token esetén automatikus kijelentkezés.

## Mire figyelj?

- **A frontend védelme nem biztonság!** A `VedettUtvonal` csak a felhasználói élményt szolgálja. Az adatokat a **szerver** védi (401) – ezt teszteld: töröld a tokent a localStorage-ból (F12 → Application), és frissíts.
- A `localStorage` tartalmát az oldalon futó bármely JavaScript elolvashatja (XSS támadás). Éles rendszerben gyakran `httpOnly` cookie-t használnak – ezt a backenden a `35-munkamenetek` feladatnál láttátok.
- A jelszót **soha** ne tárold a frontenden – csak a tokent.
- A `type="password"` és az `autoComplete` attribútumok segítik a böngésző jelszókezelőjét.

## Próbáld ki

1. Nyisd meg kijelentkezve a `/profil` oldalt → bejelentkezés után hová kerülsz?
2. F12 → Application → Local Storage: nézd meg az `auth` kulcsot. Másold ki a tokent, és illeszd be a https://jwt.io oldalra – mit látsz benne?
3. Írd át a tokent a localStorage-ban, és frissíts, majd kattints a Könyvekre. Mi történik?

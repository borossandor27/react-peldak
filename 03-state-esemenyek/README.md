# 03 – State és események

**Indítás:** `npm run 03`

## Mit mutat be a példa?

- `useState` – a komponens „memóriája”. Ha a set-függvénnyel módosítod, a komponens újrarajzolódik.
- **Eseménykezelés**: `onClick`, `onChange`, `onSubmit` … (camelCase), az értékük egy **függvény**.
- A state **frissítése az előző értékből**: `setSzam(elozo => elozo + 1)`.
- **Objektum** és **tömb** a state-ben: mindig **új** objektumot / tömböt adunk át (immutábilis frissítés).

## Tömb és objektum frissítése – puska

| Művelet | ❌ Hibás (módosítja a régit) | ✅ Helyes (újat készít) |
|---|---|---|
| hozzáadás | `lista.push(x)` | `setLista([...lista, x])` |
| törlés | `lista.splice(i, 1)` | `setLista(lista.filter(e => e.id !== id))` |
| módosítás | `lista[i].kesz = true` | `setLista(lista.map(e => e.id === id ? { ...e, kesz: true } : e))` |
| rendezés | `lista.sort()` | `setLista([...lista].sort())` |
| objektum mező | `obj.nev = 'x'` | `setObj({ ...obj, nev: 'x' })` |

## Mire figyelj?

- `onClick={novel}` ✅ – átadjuk a függvényt. `onClick={novel()}` ❌ – rögtön, rendereléskor lefut (és végtelen ciklust okozhat).
- A `setSzam(...)` után a `szam` változó **még a régi** értéket tartalmazza – az új érték a következő renderelésben lesz.
- Minden komponens-példánynak **saját** state-je van: két `<Szamlalo />` egymástól függetlenül számol.
- A hookokat (`useState` stb.) csak a komponens **legfelső szintjén** hívd, `if`-en vagy cikluson belül ne.

## Próbáld ki

1. Tegyél be két `<Szamlalo />`-t – független a két szám?
2. Írd át a `novelHarommal`-t `setSzam(szam + 1)` formára háromszor. Mennyivel nő?
3. Írd át a `pontotKap`-ot `profil.pont += 15; setProfil(profil);` formára. Frissül az oldal? Miért nem?

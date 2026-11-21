# 02 – Props, children, listák

**Indítás:** `npm run 02`

## Mit mutat be a példa?

- **Props**: adatátadás a szülő komponensből a gyereknek, mint egy HTML attribútum: `<DiakKartya nev="Anna" atlag={4.8} />`.
  - Szöveg idézőjelben, minden más (szám, tömb, objektum, függvény) **kapcsos zárójelben**.
  - A gyerekben destrukturálással olvassuk ki: `function DiakKartya({ nev, atlag })`.
  - Alapértelmezett érték: `{ hobbik = [] }`.
  - A props **csak olvasható** – a gyerek nem módosíthatja.
- **children**: a nyitó és záró tag közé írt tartalom (`<Doboz>...</Doboz>`).
- **Lista megjelenítése** `map`-pel. Minden elemnek egyedi **`key`** kell (lehetőleg az `id`, ne az index).
- **Feltételes megjelenítés**: `feltetel && <Elem />` és `feltetel ? <A /> : <B />`.
- **Spread**: `<DiakKartya {...diak} />` – az objektum összes mezője propként.

## Mire figyelj?

- A `key` a `map`-en belüli **legkülső** elemre kerül (itt a `<DiakKartya>`-ra, nem a belső `div`-re).
- `{lista.length && <Lista />}` – ha a hossz `0`, egy **0** jelenik meg az oldalon! Helyesen: `{lista.length > 0 && ...}`.
- JSX-ben `if` és `for` nem írható a `{ }` közé – helyettük `?:`, `&&`, `map`, `filter`.

## Próbáld ki

1. Vedd ki a `key`-t, és nézd meg a konzolt (F12)!
2. Adj a `DiakKartya`-nak egy `kiemelt` propot, ami vastag kerettel jelenít meg.
3. Rendezd a diákokat átlag szerint csökkenő sorrendbe a `map` előtt (`[...DIAKOK].sort(...)`).

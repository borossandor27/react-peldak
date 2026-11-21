# 05 – Komponensek kommunikációja (state felemelése)

**Indítás:** `npm run 05`

## Mit mutat be a példa?

- Egy alkalmazás **több kis komponensből** épül fel; mindegyik egy fájl a `components/` mappában.
- **Hová kerüljön a state?** Abba a **legközelebbi közös szülőbe**, amelynek minden gyereke használja. Itt az `App`-ba, mert a lista, a szűrő és a számláló is a teendőkből dolgozik.
- **Adat lefelé** props-szal, **esemény felfelé** callback függvénnyel (`onHozzaad`, `onValt`, `onTorol`).
- **Helyi state** ott marad, ahol kell: a beírt szöveg csak az `UjTeendo`-t érdekli.
- A `map` + `{ ...t, kesz: !t.kesz }` minta egy elem módosítására.

## Elnevezési szokás

| Prop | Mit jelent? |
|---|---|
| `onValami` | a gyerek ezt hívja meg, ha „valami történt” (pl. `onTorol`) |
| `kezelValami` / `handleValami` | a szülő függvénye, amit átad (pl. `hozzaad`) |

## Mire figyelj?

- A gyerek **nem** módosítja a kapott tömböt – meghívja a szülő függvényét, és a szülő állít be új state-et.
- Ne másold a propot state-be (`useState(props.teendok)`) – a másolat nem frissül, ha a szülő változik.
- `onTorol={torol(t.id)}` ❌ – azonnal lefutna. Helyesen: `onClick={() => onTorol(t.id)}`.

## Próbáld ki

1. Adj hozzá egy „Készek törlése” gombot az `App`-ban.
2. Dupla kattintásra a teendő szövege legyen szerkeszthető (`onDoubleClick`, helyi `szerkeszt` state).

# 09 – Context (közös adat props nélkül)

**Indítás:** `npm run 09`

## A probléma: „prop drilling”

Ha egy adat sok, egymástól távoli komponensnek kell (bejelentkezett felhasználó, téma, kosár), akkor props-szal minden köztes komponensen át kellene adogatni – azoknak is, amelyek nem használják.

## A megoldás: Context

```jsx
// 1. létrehozás
const TemaContext = createContext(null);

// 2. Provider: körbeveszi azt a részt, ahol elérhető legyen
<TemaContext value={{ sotet, valt }}>
  <App />
</TemaContext>

// 3. kiolvasás bármelyik gyerekben
const { sotet, valt } = useContext(TemaContext);
```

> React 19-től a `<TemaContext value>` közvetlenül is használható; régebbi kódban `<TemaContext.Provider value>` formában látod.

## Bevált szerkezet (ezt használjuk a további példákban)

Egy fájl (`context/TemaContext.jsx`) tartalmazza:

1. a contextet,
2. egy **Provider komponenst**, amiben a state és a módosító függvények vannak,
3. egy **saját hookot** (`useTema`), ami hibát dob, ha a Provideren kívül használnák.

## Mikor használj contextet?

| Igen | Nem |
|---|---|
| bejelentkezett felhasználó, token | egy űrlap mezőinek értéke |
| téma, nyelv | adat, ami csak 1–2 szinttel lejjebb kell (ott elég a props) |
| kosár egy webshopban | gyakran (pl. másodpercenként) változó adat sok komponensnek |

## Mire figyelj?

- A context értékének változásakor **minden** komponens újrarenderelődik, amelyik használja.
- A `useContext` a **legközelebbi** felette lévő Providert találja meg. Ha nincs ilyen, a `createContext` alapértékét kapja (itt `null` → a saját hook hibát dob).

## Próbáld ki

1. Tedd a `<Fejlec />`-et a `<KedvencekProvider>`-en **kívülre** – milyen hibát kapsz?
2. Mentsd a témát `localStorage`-ba, hogy frissítés után is megmaradjon (06-os példa).

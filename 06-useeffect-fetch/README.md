# 06 – useEffect és fetch

**Indítás:** `npm run 06`

## Mit mutat be a példa?

- **Mellékhatás** (*side effect*): minden, ami a megjelenítésen **kívüli** világgal dolgozik – szerverhívás, időzítő, `localStorage`, `document.title`. Ezeket `useEffect`-be tesszük.
- **Függőségi tömb**: `[]` egyszer, `[a]` ha `a` változik.
- **Takarító függvény** (*cleanup*): a `return () => ...` lefut, mielőtt a komponens eltűnik (vagy az effekt újrafut) – pl. `clearInterval`.
- **Adatbetöltés** a három állapottal: `betolt` → `hiba` → adat.
- A `public/` mappa fájljai a gyökérből érhetők el: `fetch('/varosok.json')`.
- **Lusta kezdőérték**: `useState(() => localStorage.getItem(...))`.

## A „betöltés – hiba – adat” minta

```jsx
const [adat, setAdat] = useState([]);
const [betolt, setBetolt] = useState(true);
const [hiba, setHiba] = useState(null);

useEffect(() => {
  async function letolt() {
    try {
      const valasz = await fetch(URL);
      if (!valasz.ok) throw new Error(`HTTP ${valasz.status}`);   // a fetch 404-nél NEM dob hibát!
      setAdat(await valasz.json());
    } catch (err) {
      setHiba(err.message);
    } finally {
      setBetolt(false);
    }
  }
  letolt();
}, []);

if (betolt) return <p>Betöltés...</p>;
if (hiba) return <p>Hiba: {hiba}</p>;
return <Lista adat={adat} />;
```

## Mire figyelj?

- **StrictMode** fejlesztés közben **kétszer** futtatja az effekteket (indít → takarít → indít), hogy kiderüljön, ha hiányzik a takarítás. Ezért látod kétszer a konzolban az „időzítő indul” üzenetet. Élesben (build után) csak egyszer fut.
- **Ne tegyél effektbe számolást vagy szűrést!** Amit a state-ből ki lehet számolni, azt számold ki renderelés közben (itt: `talalatok`).
- **Végtelen ciklus**: ha az effekt beállít egy state-et, ami a saját függőségei között van, újra és újra lefut.
- A `fetch` csak hálózati hibánál dob kivételt – a 404 / 500 válasznál **neked kell** megnézni a `valasz.ok`-ot.

## Próbáld ki

1. Rejtsd el az órát, és figyeld a konzolt. Vedd ki a `return () => clearInterval(...)` sort – mi történik?
2. Írd át a fetch címét `/nincs.json`-ra. Mit látsz?
3. A Fejlesztői eszközök → Hálózat (Network) fülön állíts be lassú 3G-t, és nézd meg a „Betöltés...” feliratot.

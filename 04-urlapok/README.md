# 04 – Űrlapok

**Indítás:** `npm run 04`

## Mit mutat be a példa?

- **Vezérelt mező** (*controlled input*): `value={state}` + `onChange={e => setState(e.target.value)}`.
- **Számított érték**: amit a state-ből ki lehet számolni (hossz, nagybetűs alak, összeg), azt **nem** tesszük külön state-be.
- **Több mező egy objektumban**, egy közös kezelővel: `[name]: value` (számított kulcs).
- Mezőtípusok: `input`, `type="number"`, `select`, `checkbox` (`checked`!), `textarea`.
- **Beküldés**: `<form onSubmit>` + `e.preventDefault()`, ellenőrzés, hibaüzenetek mezőnként, űrlap ürítése.

## Mire figyelj?

- Az `e.target.value` **mindig szöveg** – számolás előtt `Number(...)`.
- Checkboxnál `checked` és `e.target.checked`, nem `value`.
- Ha `value`-t adsz `onChange` nélkül, a mező **írásvédett** lesz (és figyelmeztetést kapsz a konzolban).
- Ha `value={undefined}`-ból később szöveg lesz, a React figyelmeztet („uncontrolled → controlled”). Ezért a kezdőérték `''` legyen, ne `undefined`.
- A `<button>` egy űrlapon belül alapból **submit**. A nem beküldő gombokra írd ki: `type="button"`.

## Próbáld ki

1. Adj hozzá egy „Jelszó” és „Jelszó újra” mezőt, és ellenőrizd, hogy egyeznek-e.
2. A hibaüzenet már gépelés közben tűnjön el, ha a mező helyes lett.
3. A „Jelentkezem” gomb legyen letiltva, amíg a név üres.

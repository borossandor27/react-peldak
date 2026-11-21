# 01 – Első komponens (JSX alapok)

**Indítás:** `npm run 01` → http://localhost:5173

## Új React projekt létrehozása a nulláról

A gyakorlásnál a közös `react-peldak` projektet használjuk (egy `npm install` elég mindenhez). Saját projektet (pl. vizsgaremekhez) így hozz létre:

```bash
npm create vite@latest sajat-app -- --template react
cd sajat-app
npm install
npm run dev
```

A létrejött fontosabb fájlok:

| Fájl | Szerepe |
|---|---|
| `index.html` | Az egyetlen HTML oldal. Benne egy üres `<div id="root">` – ide „rajzolja” a React az alkalmazást. |
| `src/main.jsx` | A belépési pont: megkeresi a `#root` elemet, és belerendereli az `<App />` komponenst. |
| `src/App.jsx` | A fő komponens – innen indul minden. |
| `package.json` | Függőségek és scriptek (`dev`, `build`, `preview`). |
| `vite.config.js` | A Vite (fejlesztői szerver és build eszköz) beállításai. |

`npm run build` → a kész, optimalizált oldal a `dist/` mappába kerül; ezt kell feltölteni egy webszerverre.

## Mit mutat be a példa?

- A **komponens** egy nagybetűs nevű függvény, ami **JSX**-et ad vissza.
- Komponens **másik fájlból**: `export default` + `import Fejlec from './components/Fejlec.jsx'`.
- JSX szabályok: egy gyökérelem (vagy `<>...</>` Fragment), `className`, `htmlFor`, lezárt elemek (`<br />`).
- `{ }` – JavaScript **kifejezés** a JSX-ben: változó, számolás, függvényhívás, `?:`.
- Inline stílus **objektumként**: `style={{ backgroundColor: 'red' }}`.

## HTML vs. JSX

| HTML | JSX |
|---|---|
| `<div class="doboz">` | `<div className="doboz">` |
| `<label for="nev">` | `<label htmlFor="nev">` |
| `<br>` `<img src="x.png">` | `<br />` `<img src="x.png" />` |
| `style="font-size: 20px"` | `style={{ fontSize: 20 }}` |
| `onclick="f()"` | `onClick={f}` |
| `<!-- megjegyzés -->` | `{/* megjegyzés */}` |

## Próbáld ki

1. Írd át a `Fejlec` `cim` tulajdonságát, és mentsd el – a böngésző azonnal frissül (Hot Module Replacement).
2. Hozz létre egy `components/Nevjegy.jsx` komponenst, és tedd be kétszer az `App`-ba.
3. Írj `class`-t `className` helyett – mit ír a böngésző konzolja (F12)?

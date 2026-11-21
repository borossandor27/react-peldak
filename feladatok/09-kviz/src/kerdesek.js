// helyes: a helyes válasz INDEXE a valaszok tömbben
export const KERDESEK = [
  { id: 1, kerdes: 'Melyik hookkal tárolunk változó adatot egy komponensben?', valaszok: ['useEffect', 'useState', 'useContext', 'useRef'], helyes: 1 },
  { id: 2, kerdes: 'Mi a helyes JSX attribútum a CSS osztályhoz?', valaszok: ['class', 'cssClass', 'className', 'style'], helyes: 2 },
  { id: 3, kerdes: 'Mire kell a key egy listában?', valaszok: ['A stílushoz', 'Hogy a React azonosítsa az elemeket', 'A rendezéshez', 'Semmire'], helyes: 1 },
  { id: 4, kerdes: 'Mikor fut le a useEffect(fv, []) ?', valaszok: ['Minden renderelés után', 'Soha', 'Csak az első megjelenéskor', 'Kattintáskor'], helyes: 2 },
  { id: 5, kerdes: 'Hogyan adunk hozzá elemet egy state-ben tárolt tömbhöz?', valaszok: ['lista.push(x)', 'setLista([...lista, x])', 'lista[lista.length] = x', 'setLista(lista.push(x))'], helyes: 1 },
  { id: 6, kerdes: 'Melyik a helyes eseménykezelő?', valaszok: ['onClick={mentes()}', 'onclick="mentes()"', 'onClick={mentes}', 'onClick="mentes"'], helyes: 2 },
  { id: 7, kerdes: 'Milyen típusú az e.target.value egy type="number" mezőnél?', valaszok: ['number', 'string', 'boolean', 'undefined'], helyes: 1 },
  { id: 8, kerdes: 'Mit ad vissza a useParams()?', valaszok: ['A query string-et', 'Az útvonal-paramétereket', 'A props-ot', 'A state-et'], helyes: 1 },
];

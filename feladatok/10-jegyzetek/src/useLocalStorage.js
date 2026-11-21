// =====================================================
// Saját hook: ugyanúgy használható, mint a useState, de az értéket
// localStorage-ba is menti, és onnan tölti be.
//
//   const [jegyzetek, setJegyzetek] = useLocalStorage('jegyzetek', []);
//
// A saját hook neve "use"-zal kezdődik, és belül más hookokat használhat.
// =====================================================
import { useEffect, useState } from 'react';

export function useLocalStorage(kulcs, kezdoErtek) {
  // TODO: lusta kezdőérték: ha van mentett érték a kulcs alatt, JSON.parse-szal azt add vissza,
  //       különben a kezdoErtek-et. Hibás JSON esetén (try...catch) is a kezdoErtek legyen!
  const [ertek, setErtek] = useState(kezdoErtek);

  // TODO: useEffect: minden változáskor mentsd el (JSON.stringify)

  return [ertek, setErtek];
}

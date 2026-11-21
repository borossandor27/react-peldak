// Gyakorló szerver: a titkos kulcs itt fixen szerepel, hogy ne kelljen .env fájl.
// Éles alkalmazásban SOHA ne így legyen (lásd: backend/08-authentication).
export const PORT = Number(process.env.PORT ?? 3000);
export const JWT_SECRET = process.env.JWT_SECRET ?? 'gyakorlo-szerver-titkos-kulcsa-csak-oktatasi-celra-2026';
// npm run szerver-30mp  ->  a token 30 másodperc után lejár (a 401-es hiba kezelésének teszteléséhez)
export const JWT_LEJARAT = process.argv.includes('--rovid-token') ? '30s' : (process.env.JWT_LEJARAT ?? '2h');

// Mesterséges késleltetés (ms), hogy a frontendben látszódjon a "Betöltés..." állapot
export const KESLELTETES = Number(process.env.KESLELTETES ?? 400);

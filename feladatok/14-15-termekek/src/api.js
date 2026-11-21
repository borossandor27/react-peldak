// =====================================================
// 14-15. feladat - API hívások egy helyen
// A keres() kész (lásd 08-api-crud mintapélda). A termekApi függvényeit neked kell megírnod.
// =====================================================

// Hiba esetén olyan Error-t dob, amelynek van:
//   err.status  - HTTP státuszkód (400, 404, ...)
//   err.hibak   - a 400-as válasz mezőhibái tömbként (különben üres tömb)
export async function keres(url, { method = 'GET', body } = {}) {
  const valasz = await fetch(url, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
  const adat = valasz.status === 204 ? null : await valasz.json().catch(() => null);
  if (!valasz.ok) {
    const err = new Error(adat?.hiba ?? (adat?.hibak ? 'Hibás adatok.' : `HTTP ${valasz.status}`));
    err.status = valasz.status;
    err.hibak = adat?.hibak ?? [];
    throw err;
  }
  return adat;
}

export const termekApi = {
  // TODO: GET /api/termekek?kereses=...  (ha üres a keresés, a ?kereses= se kerüljön a címbe; encodeURIComponent!)
  lista: (kereses = '') => keres('/api/termekek'),
  // TODO: GET /api/termekek/:id
  egy: (id) => Promise.reject(new Error('TODO')),
  // TODO: POST /api/termekek
  uj: (termek) => Promise.reject(new Error('TODO')),
  // TODO: PUT /api/termekek/:id   (a TELJES terméket kell küldeni, id nélkül)
  modosit: (id, termek) => Promise.reject(new Error('TODO')),
  // TODO: DELETE /api/termekek/:id
  torol: (id) => Promise.reject(new Error('TODO')),
};

export const ft = (n) => `${n.toLocaleString('hu-HU')} Ft`;

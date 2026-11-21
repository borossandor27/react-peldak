// =====================================================
// Egy helyen kezeljük a szerverhívásokat.
// Előny: a komponensekben nem kell mindenhol ugyanazt a fetch + hibakezelést megírni.
//
// A cím '/api/...' -> a Vite proxy továbbítja a http://localhost:3000-re (vite.config.js)
// =====================================================

export async function keres(url, { method = 'GET', body } = {}) {
  const valasz = await fetch(url, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : undefined,
  });

  // 204 No Content: nincs törzs, nem lehet .json()-t hívni
  const adat = valasz.status === 204 ? null : await valasz.json();

  if (!valasz.ok) {
    // A szerver hibaüzenete { hiba: '...' } vagy { hibak: [...] } formában jön
    const uzenet = adat?.hibak?.join(' ') ?? adat?.hiba ?? `HTTP ${valasz.status}`;
    throw new Error(uzenet);
  }
  return adat;
}

// Rövidítések az egyes műveletekhez
export const termekApi = {
  lista: () => keres('/api/termekek'),
  uj: (termek) => keres('/api/termekek', { method: 'POST', body: termek }),
  torol: (id) => keres(`/api/termekek/${id}`, { method: 'DELETE' }),
};

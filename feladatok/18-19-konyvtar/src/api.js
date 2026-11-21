// Közös fetch segédfüggvény (tokennel). Hiba: Error + status + hibak
export async function keres(url, { method = 'GET', body, token } = {}) {
  const headers = {};
  if (body) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;

  const valasz = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const adat = valasz.status === 204 ? null : await valasz.json().catch(() => null);

  if (!valasz.ok) {
    const err = new Error(adat?.hiba ?? (adat?.hibak ? adat.hibak.join(' ') : `HTTP ${valasz.status}`));
    err.status = valasz.status;
    err.hibak = adat?.hibak ?? [];
    throw err;
  }
  return adat;
}

// Közös fetch segédfüggvény. Ha van token, Authorization fejlécben küldi.
// Hiba esetén olyan Error-t dob, amelynek "status" mezője is van (401, 403, 404...).
export async function keres(url, { method = 'GET', body, token } = {}) {
  const headers = {};
  if (body) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;

  const valasz = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const adat = valasz.status === 204 ? null : await valasz.json().catch(() => null);

  if (!valasz.ok) {
    const err = new Error(adat?.hibak?.join(' ') ?? adat?.hiba ?? `HTTP ${valasz.status}`);
    err.status = valasz.status;
    throw err;
  }
  return adat;
}

// =====================================================
// Gyakorló API szerver a React példákhoz és feladatokhoz
// Indítás:        npm run szerver        (http://localhost:3000)
// Visszaállítás:  npm run szerver-reset  (az eredeti adatok)
//
// A frontend (Vite, http://localhost:5173) a /api kezdetű kéréseket
// ide továbbítja (lásd vite.config.js -> server.proxy).
//
// Mintafelhasználók – mindegyik jelszava: Jelszo123
//   olvaso@konyvtar.hu      user        diak@iskola.hu   diak
//   konyvtaros@konyvtar.hu  librarian   diak2@iskola.hu  diak
//   admin@konyvtar.hu       admin       tanar@iskola.hu  tanar
//                                       tanar2@iskola.hu tanar
//                                       admin@iskola.hu  admin
// =====================================================
import express from 'express';
import { PORT, KESLELTETES, JWT_LEJARAT } from './config.js';
import termekekRouter from './routes/termekek.js';
import authRouter from './routes/auth.js';
import felhasznalokRouter from './routes/felhasznalok.js';
import konyvekRouter, { szerzokRouter } from './routes/konyvek.js';
import szakkorokRouter from './routes/szakkorok.js';

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  req.body ??= {};
  next();
});

// Naplózás + mesterséges késleltetés, hogy a "Betöltés..." felirat is látszódjon
app.use((req, res, next) => {
  console.log(`${new Date().toLocaleTimeString('hu-HU')}  ${req.method} ${req.url}`);
  setTimeout(next, KESLELTETES);
});

app.get('/', (req, res) => {
  res.json({
    uzenet: 'Gyakorló API a React feladatokhoz',
    vegpontok: [
      'GET|POST /api/termekek, GET|PUT|DELETE /api/termekek/:id (nyilvános)',
      'POST /api/auth/regisztracio, POST /api/auth/bejelentkezes, GET /api/auth/en',
      'GET /api/szerzok, GET|POST /api/konyvek, GET|PUT|DELETE /api/konyvek/:id',
      'GET /api/felhasznalok, PATCH /api/felhasznalok/:id/szerepkor, DELETE /api/felhasznalok/:id (admin)',
      'GET|POST /api/szakkorok, GET|PUT|DELETE /api/szakkorok/:id, GET /api/szakkorok/:id/resztvevok, POST|DELETE /api/szakkorok/:id/jelentkezes',
    ],
  });
});

app.use('/api/termekek', termekekRouter);
app.use('/api/auth', authRouter);
app.use('/api/felhasznalok', felhasznalokRouter);
app.use('/api/szerzok', szerzokRouter);
app.use('/api/konyvek', konyvekRouter);
app.use('/api/szakkorok', szakkorokRouter);

app.use((req, res) => {
  res.status(404).json({ hiba: `Nincs ilyen végpont: ${req.method} ${req.url}` });
});

app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') return res.status(400).json({ hiba: 'Hibás JSON a kérés törzsében.' });
  console.error(err);
  res.status(500).json({ hiba: 'Szerverhiba' });
});

app.listen(PORT, () => {
  console.log(`Gyakorló API fut: http://localhost:${PORT}  (token lejárata: ${JWT_LEJARAT})`);
});

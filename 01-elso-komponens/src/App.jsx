// =====================================================
// 01 - Első komponens: JSX alapok
// Indítás: npm run 01   ->   http://localhost:5173
//
// Egy React KOMPONENS egy nagybetűvel kezdődő függvény,
// amely JSX-et ad vissza (HTML-hez hasonló jelölés a JavaScriptben).
// =====================================================
import Fejlec from './components/Fejlec.jsx';
import Lablec from './components/Lablec.jsx';

// A komponensen KÍVÜL lévő konstansok egyszer jönnek létre
const ISKOLA = 'BGéSzC Logisztikai és Kereskedelmi Technikum';
const TANTARGYAK = ['Frontend', 'Backend', 'Adatbázis', 'Hálózatok'];

export default function App() {
  // A komponens belsejében sima JavaScript-et írhatunk...
  const most = new Date();
  const ora = most.getHours();
  const napszak = ora < 10 ? 'Jó reggelt' : ora < 18 ? 'Jó napot' : 'Jó estét';

  const kiemeltStilus = {
    // style: objektum, camelCase tulajdonságnevekkel (background-color -> backgroundColor)
    backgroundColor: '#dbeafe',
    padding: '8px 12px',
    borderRadius: 6,
  };

  // ...a return után pedig JSX jön. Szabályok:
  //  1. EGY gyökérelem legyen (ha nem kell div, használj <> ... </> Fragmentet)
  //  2. class helyett className, for helyett htmlFor
  //  3. minden elemet le kell zárni: <br />, <img />, <input />
  //  4. { } között bármilyen JavaScript KIFEJEZÉS állhat (if/for nem, de ?: és && igen)
  return (
    <>
      <Fejlec cim="Az első React alkalmazásom" />

      <main className="kartya">
        <p>
          {napszak}! Most {most.toLocaleTimeString('hu-HU')} van.
        </p>
        <p style={kiemeltStilus}>Iskola: {ISKOLA}</p>

        <p>2 + 3 = {2 + 3}</p>
        <p>Nagybetűvel: {'react'.toUpperCase()}</p>
        <p>Tantárgyak száma: {TANTARGYAK.length}</p>
        <p>Felsorolva: {TANTARGYAK.join(', ')}</p>

        {/* Ez egy megjegyzés a JSX-ben */}
        <label htmlFor="nev">Név:</label>
        <input id="nev" placeholder="Írd be a neved" />
      </main>

      {/* Ugyanazt a komponenst többször is felhasználhatjuk */}
      <Lablec />
    </>
  );
}

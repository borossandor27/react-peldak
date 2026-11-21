// =====================================================
// 07 - Több oldal egy alkalmazásban: React Router
// Indítás: npm run 07
//
// SPA (Single Page Application): a böngésző NEM tölt le új HTML-t,
// a React Router a cím (URL) alapján dönti el, melyik komponenst mutassa.
//
//   /                    -> Fooldal
//   /tantargyak          -> Tantargyak   (?evfolyam=13 szűrővel)
//   /tantargyak/:id      -> TantargyReszlet
//   /rolunk              -> Rolunk
//   bármi más            -> NemTalalhato
// =====================================================
import { BrowserRouter, Routes, Route } from 'react-router';
import Elrendezes from './components/Elrendezes.jsx';
import Fooldal from './pages/Fooldal.jsx';
import Tantargyak from './pages/Tantargyak.jsx';
import TantargyReszlet from './pages/TantargyReszlet.jsx';
import Rolunk from './pages/Rolunk.jsx';
import NemTalalhato from './pages/NemTalalhato.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Közös elrendezés (menü + lábléc), a gyerek útvonalak az <Outlet /> helyére kerülnek */}
        <Route element={<Elrendezes />}>
          <Route index element={<Fooldal />} />
          <Route path="tantargyak" element={<Tantargyak />} />
          <Route path="tantargyak/:id" element={<TantargyReszlet />} />
          <Route path="rolunk" element={<Rolunk />} />
          <Route path="*" element={<NemTalalhato />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

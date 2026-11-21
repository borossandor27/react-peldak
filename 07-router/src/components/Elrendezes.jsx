import { NavLink, Outlet } from 'react-router';

// <a href> helyett <Link to> / <NavLink to>: nem tölti újra az oldalt!
// A NavLink automatikusan "active" osztályt kap, ha az aktuális oldalra mutat.
export default function Elrendezes() {
  return (
    <>
      <nav>
        <strong>📚 Tantárgyak</strong>
        {/* end: a "/" csak pontos egyezésnél legyen aktív, ne minden oldalon */}
        <NavLink to="/" end>
          Főoldal
        </NavLink>
        <NavLink to="/tantargyak">Tantárgyak</NavLink>
        <NavLink to="/rolunk">Rólunk</NavLink>
      </nav>

      <main>
        <Outlet />
      </main>

      <footer className="halvany">
        <small>React Router példa</small>
      </footer>
    </>
  );
}

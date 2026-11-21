import { Link, useLocation } from 'react-router';

export default function NemTalalhato() {
  const { pathname } = useLocation();
  return (
    <div className="kartya">
      <h1>404 – Az oldal nem található</h1>
      <p>
        A(z) <code>{pathname}</code> oldal nem létezik.
      </p>
      <Link to="/">Vissza a főoldalra</Link>
    </div>
  );
}

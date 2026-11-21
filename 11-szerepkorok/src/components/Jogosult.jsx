import { useAuth } from '../context/AuthContext.jsx';

// Csak akkor jeleníti meg a tartalmát, ha a felhasználónak megvan a jog.
//   <Jogosult jog="konyv:torol"><button>Törlés</button></Jogosult>
export default function Jogosult({ jog, children }) {
  const { jogosult } = useAuth();
  return jogosult(jog) ? children : null;
}

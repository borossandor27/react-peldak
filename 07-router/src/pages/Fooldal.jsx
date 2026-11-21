import { Link } from 'react-router';

export default function Fooldal() {
  return (
    <div className="kartya">
      <h1>Üdvözöllek!</h1>
      <p>Ez egy többoldalas React alkalmazás – figyeld a címsort, miközben kattintgatsz.</p>
      <p>
        Nézd meg a <Link to="/tantargyak">tantárgyak listáját</Link>, vagy csak a{' '}
        <Link to="/tantargyak?evfolyam=13">13. évfolyamét</Link>.
      </p>
    </div>
  );
}

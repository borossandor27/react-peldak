// TODO: VedettUtvonal - props: jog (elhagyható)
//  - nincs bejelentkezve -> <Navigate to="/bejelentkezes" ... /> (jegyezd meg, honnan jött!)
//  - nincs meg a jog -> "⛔ 403 – Nincs jogosultságod" kártya, link a könyvekhez
//  - különben <Outlet />
import { Outlet } from 'react-router';

export default function VedettUtvonal() {
  return <Outlet />;
}

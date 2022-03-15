import { Sidenav } from "rsuite";
import './Sidebar.css';

function Sidebar({ children }: { children: JSX.Element[] }): JSX.Element {
  return (
    <Sidenav expanded={false}>
      <Sidenav.Body>
        {children}
      </Sidenav.Body>
    </Sidenav>
  );
}

export default Sidebar;

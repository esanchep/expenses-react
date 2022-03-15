import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { Nav } from "rsuite";

function SidebarItem({ icon, path, text }: { icon: ReactElement; path: string; text: string; }) {
  const navigate = useNavigate();
  const navigateTo = () => {
    navigate(path)
  }
  return (
    <Nav>
      <Nav.Item onClick={navigateTo} icon={icon}>{text}</Nav.Item>
    </Nav>
  );
}

export default SidebarItem;
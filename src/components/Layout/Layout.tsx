import Dashboard from '@rsuite/icons/Dashboard';
import ListIcon from '@rsuite/icons/List';
import SettingIcon from '@rsuite/icons/Setting';
import './Layout.css';
import Sidebar from './sidebar/Sidebar';
import SidebarItem from './sidebar/SidebarItem';

function Layout({ content }: { content: JSX.Element }): JSX.Element {
  return (
    <div className="Layout">
      <div className="Sidebar">
        <Sidebar>
          <SidebarItem icon={<Dashboard />} path="/summary" text="Summary" />
          <SidebarItem icon={<ListIcon />} path="/expenses" text="Expenses" />
          <SidebarItem icon={<SettingIcon />} path="/configuration" text="Configuration" />
        </Sidebar>
      </div>
      <div className="Content">
        {content}
      </div>
    </div>
  );
}

export default Layout;

import Dashboard from '@rsuite/icons/Dashboard';
import ListIcon from '@rsuite/icons/List';
import SettingIcon from '@rsuite/icons/Setting';
import { ReactElement, useEffect, useState } from "react";
import { Button, Nav, Sidenav, Table } from "rsuite";
import Expense from "./Expense";
import './Expenses.css';

const { Column, HeaderCell, Cell } = Table;

function Sidebar({ expandable = false, children }: { expandable: boolean; children: JSX.Element[] }) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const expandSidebar = () => setExpanded(true);
  const shrinkSidebar = () => setExpanded(false);
  return (
    <Sidenav
      expanded={expandable && expanded}
      onMouseEnter={expandSidebar}
      // onMouseLeave={shrinkSidebar}
      >
      <Sidenav.Body>
        {children}
      </Sidenav.Body>
    </Sidenav>
  );
}

function SidebarItem({ icon, text }: { icon: ReactElement; text: string; }) {
  return (
    <Nav>
      <Nav.Item icon={icon}>{text}</Nav.Item>
    </Nav>
  );
}

function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [tableData, setTableData] = useState<Expense[]>([]);
  const token = localStorage.getItem('token') || '';
  const fetchExpenses = () => {
    fetch(`http://localhost:8080/expenses?groupId=${token}`, { headers: { token } })
      .then(data => data.json())
      .then((response: { totalElements: number; expenses: Expense[] }) => setExpenses(response.expenses));
  };

  useEffect(() => {
    setTableData(expenses);
  }, [expenses]);

  return (
    <div className="Expenses">
      <Sidebar expandable={true}>
        <SidebarItem icon={<Dashboard />} text="Summary" />
        <SidebarItem icon={<ListIcon />} text="Expenses" />
        <SidebarItem icon={<SettingIcon />} text="Configuration" />
      </Sidebar>
      <Button onClick={fetchExpenses}>Fetch!</Button>
      <Table data={tableData} autoHeight={true}>
        <Column width={250}>
          <HeaderCell>Tipo</HeaderCell>
          <Cell dataKey="type" />
        </Column>

        <Column width={250}>
          <HeaderCell>Subtipo</HeaderCell>
          <Cell dataKey="subtype" />
        </Column>

        <Column width={150}>
          <HeaderCell>Cantidad</HeaderCell>
          <Cell dataKey="amount" />
        </Column>

        <Column width={150}>
          <HeaderCell>Fecha</HeaderCell>
          <Cell dataKey="date" />
        </Column>

        <Column flexGrow={1} minWidth={250}>
          <HeaderCell>Comentario</HeaderCell>
          <Cell dataKey="comment" />
        </Column>
      </Table>
    </div>
  );
}

export default Expenses;

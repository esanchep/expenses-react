import { useEffect, useState } from "react";
import { Button, Table } from "rsuite";
import Expense from "./Expense";
import './Expenses.css';

const { Column, HeaderCell, Cell } = Table;

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

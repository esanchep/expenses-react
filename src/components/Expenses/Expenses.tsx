import FunnelIcon from '@rsuite/icons/Funnel';
import PlusIcon from '@rsuite/icons/Plus';
import SearchIcon from '@rsuite/icons/Search';
import { useState } from "react";
import { IconButton } from "rsuite";
import { Table as ExpensesTable } from '../Table/Table';
import TableBody from '../Table/TableBody';
import TableCell from '../Table/TableCell';
import TableHead from '../Table/TableHead';
import TableRow from '../Table/TableRow';
import { Expense } from "./Expense";
import './Expenses.css';


// function toEuropeanFormat(amount: number): string {
//   return amount.toLocaleString(navigator.language, { maximumFractionDigits: 2, minimumFractionDigits: 2 });
// }

function Expenses(): JSX.Element {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  // const [tableData, setTableData] = useState<ExpenseItem[]>([]);
  const token = localStorage.getItem('token') || '';
  const fetchExpenses = () => {
    fetch(`http://localhost:8080/expenses?groupId=${token}&pageSize=10`, { headers: { token } })
      .then(data => data.json())
      .then((response: { totalElements: number; expenses: Expense[] }) => {
        setExpenses(response.expenses)
      });
  };

  // useEffect(() => {
  //   setTableData(expenses.map(expense => ({
  //     ...expense,
  //     amount: toEuropeanFormat(expense.amount),
  //     date: (new Date(expense.date.toString())).toLocaleDateString(navigator.language)
  //   })));
  // }, [expenses]);

  return (
    <>
      <div className="Expenses-action-bar">
        <IconButton className="Expenses-action-bar-button" appearance="primary" color="green" size="md" icon={<PlusIcon />}>
          Add
        </IconButton>
        <IconButton className="Expenses-action-bar-button" size="md" icon={<FunnelIcon />}>
          Filter
        </IconButton>
        <IconButton className="Expenses-action-bar-button" appearance="primary" onClick={fetchExpenses} size="md" icon={<SearchIcon />}>
          Search
        </IconButton>
      </div>
      <ExpensesTable>
        <TableHead>
          <TableCell className="type">Tipo</TableCell>
          <TableCell className="subtype">Subtipo</TableCell>
          <TableCell className="amount">Cantidad</TableCell>
          <TableCell className="date">Fecha</TableCell>
          <TableCell className="comment">Comentario</TableCell>
        </TableHead>
        <TableBody>
          {expenses.map(expense =>
            <TableRow>
              <TableCell className="type">{expense.type}</TableCell>
              <TableCell className="subtype">{expense.subtype}</TableCell>
              <TableCell className="amount">{expense.amount} €</TableCell>
              <TableCell className="date">{expense.date}</TableCell>
              <TableCell className="comment">{expense.comment}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </ExpensesTable>
    </>
  );
}

export default Expenses;

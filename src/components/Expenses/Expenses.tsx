import FunnelIcon from '@rsuite/icons/Funnel';
import PlusIcon from '@rsuite/icons/Plus';
import SearchIcon from '@rsuite/icons/Search';
import { useState } from "react";
import { IconButton } from "rsuite";
import Currency from '../Currency/Currency';
import Header from '../Layout/header/Header';
import { Table as ExpensesTable } from '../Table/Table';
import TableBody from '../Table/TableBody';
import TableCell from '../Table/TableCell';
import TableHead from '../Table/TableHead';
import TableRow from '../Table/TableRow';
import { Expense } from "./Expense";
import './Expenses.css';


function Expenses(): JSX.Element {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const token = localStorage.getItem('token') || '';
  const fetchExpenses = () => {
    fetch(`http://localhost:8080/expenses?groupId=${token}&pageSize=100`, { headers: { token } })
      .then(data => data.json())
      .then((response: { reason: string; totalElements: number; expenses: Expense[] }) => {
        if (!response?.expenses) {
          throw new Error(!! response ? response.reason : 'Error trying to get expenses.');
        }
        setExpenses(response?.expenses || [])
      })
      .catch(error => console.error(error.message));
  };

  return (
    <>
      <Header title="Expenses">
        <IconButton className="Expenses-action-bar-button" appearance="primary" color="green" size="md" icon={<PlusIcon />}>
          Add
        </IconButton>
        <IconButton className="Expenses-action-bar-button" size="md" icon={<FunnelIcon />}>
          Filter
        </IconButton>
        <IconButton className="Expenses-action-bar-button" appearance="primary" onClick={fetchExpenses} size="md" icon={<SearchIcon />}>
          Search
        </IconButton>
      </Header>
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
              <TableCell className="amount"><Currency amount={expense.amount} /></TableCell>
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

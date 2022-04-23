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
import AddExpense from './AddExpense/AddExpense';
import { Expense } from "./Expense";
import './Expenses.css';
import ExpensesFilter from './ExpensesFilter/ExpensesFilter';


function Expenses(): JSX.Element {
  // const [filter, setFilter] = useState<string>('&pageSize=100');
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const token = localStorage.getItem('token') || '';
  const handleHttpErrors = (response: Response) => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json();
  }
  // const fetchExpenses = () => {
  const fetchExpenses = (filter: string) => {
    fetch(`http://localhost:8080/expenses?groupId=${token}${filter}`, { headers: { token } })
      .then(handleHttpErrors)
      .then((response: { reason: string; totalElements: number; expenses: Expense[] }) => {
        if (!response?.expenses) {
          throw new Error(!!response ? response.reason : 'Error trying to get expenses.');
        }
        setExpenses(response?.expenses || [])
      })
      .catch(error => console.error(error.message));
  };
  const addToActualExpensesList = (addedExpense: Expense) => {
    const updatedExpenseList = [...expenses];
    updatedExpenseList.unshift(addedExpense);
    setExpenses(updatedExpenseList);
  };
  const [addExpenseOpened, setAddExpenseOpened] = useState<boolean>(false);
  const openAddExpenseModal = () => setAddExpenseOpened(true);
  const handleCloseAddExpense = () => setAddExpenseOpened(false);
  const handleAddExpense = (expense: Expense) => {
    fetch(`http://localhost:8080/expenses`, {
      headers: {
        "Content-Type": "application/json",
        token
      },
      method: 'POST',
      body: JSON.stringify(expense)
    }).then(handleHttpErrors)
      .then((addedExpense: Expense) => addToActualExpensesList(addedExpense))
      .catch((error) => console.log(error))
      .finally(() => setAddExpenseOpened(false));
  }
  // const handleFilter = (newFilter: string) => setFilter(newFilter);

  return (
    <>
      <Header title="Expenses">
        <IconButton onClick={openAddExpenseModal} className="Expenses-action-bar-item" appearance="primary" color="green" size="md" icon={<PlusIcon />}>
          Añadir
        </IconButton>
        <ExpensesFilter className="Expenses-action-bar-item" handleSearch={fetchExpenses} />
        {/* <IconButton className="Expenses-action-bar-item" size="md" icon={<FunnelIcon />}>
          Filtrar
        </IconButton>
        <IconButton className="Expenses-action-bar-item" appearance="primary" onClick={fetchExpenses} size="md" icon={<SearchIcon />}>
          Buscar
        </IconButton> */}
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
            <TableRow key={expense.id}>
              <TableCell className="type">{expense.type}</TableCell>
              <TableCell className="subtype">{expense.subtype}</TableCell>
              <TableCell className="amount"><Currency amount={expense.amount} /></TableCell>
              <TableCell className="date">{expense.date}</TableCell>
              <TableCell className="comment">{expense.comment}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </ExpensesTable>
      <AddExpense open={addExpenseOpened} handleClose={handleCloseAddExpense} handleAddExpense={handleAddExpense} />
    </>
  );
}

export default Expenses;

import PlusIcon from '@rsuite/icons/Plus';
import { useState } from "react";
import { IconButton, Message } from "rsuite";
import Currency from '../Currency/Currency';
import Header from '../Layout/header/Header';
import { Table as ExpensesTable } from '../Table/Table';
import TableBody from '../Table/TableBody';
import TableCell from '../Table/TableCell';
import TableHead from '../Table/TableHead';
import TableRow from '../Table/TableRow';
import AddExpense from './AddExpense/AddExpense';
import DeleteExpense from './DeleteExpense/DeleteExpense';
import { Expense } from "./Expense";
import './Expenses.css';
import ExpensesFilter from './ExpensesFilter/ExpensesFilter';
import toaster from 'rsuite/toaster';


function Expenses(): JSX.Element {
  let httpError = false;
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const token = localStorage.getItem('token') || '';
  const handleHttpErrors = (response: Response) => {
    if (!response.ok) {
      httpError = true;
      toaster.push(<Message showIcon type="error">Error: {response.statusText}</Message>, { placement: 'bottomCenter' });
      throw new Error(response.statusText)
    }
    return response;
  }
  const fetchExpenses = (filter: string) => {
    fetch(`http://localhost:8080/expenses?groupId=${token}${filter}`, { headers: { token } })
      .then(handleHttpErrors)
      .then((response: Response) => response.json())
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
      .then((response: Response) => response.json())
      .then((addedExpense: Expense) => {
        toaster.push(<Message showIcon type="success">Gasto añadido</Message>, { placement: 'bottomCenter' });
        addToActualExpensesList(addedExpense);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        if (httpError) {
          return;
        }
        setAddExpenseOpened(false);
      });
  }
  const [editExpenseOpened, setEditExpenseOpened] = useState<boolean>(false);
  const editExpense = (expense: Expense) => {
    // TODO
  };
  const [expenseToDelete, setExpenseToDelete] = useState<string | undefined>(undefined)
  const [deleteExpenseOpened, setDeleteExpenseOpened] = useState<boolean>(false);
  const handleCloseDeleteExpense = () => {
    setDeleteExpenseOpened(false);
    setExpenseToDelete(undefined);
  };
  const removeFromActualExpensesList = (deletedExpense: string) => {
    const updatedExpenseList = [...expenses];
    const deletedExpenseIndex: number = updatedExpenseList.findIndex(expense => expense.id = deletedExpense);
    updatedExpenseList.splice(deletedExpenseIndex, 1);
    setExpenses(updatedExpenseList);
  };
  const handleDeleteExpense = () => {
    fetch(`http://localhost:8080/expenses/${expenseToDelete}?groupId=${token}`, {
      headers: {
        "Content-Type": "application/json",
        token
      },
      method: 'DELETE'
    }).then(handleHttpErrors)
      .then(() => {
        toaster.push(<Message showIcon type="success">Gasto borrado</Message>, { placement: 'bottomCenter' });
        removeFromActualExpensesList(expenseToDelete!);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        if (httpError) {
          return;
        }
        handleCloseDeleteExpense();
      });
  };

  return (
    <>
      <Header title="Gastos">
        <IconButton onClick={openAddExpenseModal} className="Expenses-action-bar-item Expenses-add-button" appearance="primary" color="green" size="md" icon={<PlusIcon />} />
        <ExpensesFilter className="Expenses-action-bar-item" handleSearch={fetchExpenses} />
      </Header>
      <ExpensesTable>
        <TableHead>
          <TableCell className="type">Tipo</TableCell>
          <TableCell className="subtype">Subtipo</TableCell>
          <TableCell className="amount">Cantidad</TableCell>
          <TableCell className="date">Fecha</TableCell>
          <TableCell className="comment">Comentario</TableCell>
          <TableCell className="comment">Acciones</TableCell>
        </TableHead>
        <TableBody>
          {expenses.map(expense =>
            <TableRow key={expense.id}>
              <TableCell className="type">{expense.type}</TableCell>
              <TableCell className="subtype">{expense.subtype}</TableCell>
              <TableCell className={`amount ${expense.type === 'Ingreso' ? 'bold' : ''}`}><Currency amount={expense.amount} /></TableCell>
              <TableCell className="date">{expense.date}</TableCell>
              <TableCell className="comment">{expense.comment}</TableCell>
              <TableCell className='actions'><span className="action" onClick={() => editExpense(expense)}>Editar</span> | <span className="action" onClick={() => {
                setExpenseToDelete(expense.id);
                setDeleteExpenseOpened(true);
              }}>Borrar</span></TableCell>
            </TableRow>
          )}
        </TableBody>
      </ExpensesTable>
      <AddExpense open={addExpenseOpened} handleClose={handleCloseAddExpense} handleAddExpense={handleAddExpense} />
      <DeleteExpense open={deleteExpenseOpened} handleClose={handleCloseDeleteExpense} handleDeleteExpense={handleDeleteExpense} />
    </>
  );
}

export default Expenses;

import { Button, Modal } from "rsuite";
import { Expense } from "../Expense";

function AddExpense({ open, handleClose, handleAddExpense }: { open: boolean; handleClose: () => void; handleAddExpense: (expense: Expense) => void; }): JSX.Element {
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>Something here</>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {
            const expenseToAdd: Expense = {
              groupId: "c23e4dfb-8840-4759-b31b-b14f11284202",
              type: "",
              subtype: "",
              amount: 0,
              date: new Date(),
              comment: ""
            };
            handleAddExpense(expenseToAdd);
          }} appearance="primary">
            Add
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddExpense;

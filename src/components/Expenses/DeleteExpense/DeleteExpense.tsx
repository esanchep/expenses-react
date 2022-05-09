import { Button, Modal } from "rsuite";

function DeleteExpense({ open, handleClose, handleDeleteExpense }: { open: boolean; handleClose: () => void; handleDeleteExpense: () => void; }): JSX.Element {
  return (
    <>
      <Modal open={open} onClose={handleClose} backdrop="static">
        <Modal.Header>
          <Modal.Title>Borrar gasto</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Seguro que quieres borrarlo?</Modal.Body>
        <Modal.Footer>
          <Button appearance="primary" color="red" onClick={handleDeleteExpense}>
            Borrar
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteExpense;

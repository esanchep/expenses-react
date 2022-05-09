import { useState } from "react";
import { Button, DatePicker, Input, InputNumber, InputPicker, Modal } from "rsuite";
import { ItemDataType } from "rsuite/esm/@types/common";
import { Expense, TYPES, SUBTYPES } from "../Expense";

function AddExpense({ open, handleClose, handleAddExpense }: { open: boolean; handleClose: () => void; handleAddExpense: (expense: Expense) => void; }): JSX.Element {
  const [type, setType] = useState<string>(undefined!);
  const [subtype, setSubtype] = useState<string>(undefined!);
  const [amount, setAmount] = useState<number>(undefined!);
  const [date, setDate] = useState<Date>(undefined!);
  const [comment, setComment] = useState<string>(undefined!);
  const [subtypes, setSubtypes] = useState<ItemDataType[]>([]);
  const handleSelectType = (selectedType: string) => {
    setType(selectedType);
    setSubtypes(SUBTYPES[selectedType]);
  };
  const handleSetAmount = (amountSet: string | number) => {
    if (typeof amountSet === 'string') {
      setAmount(parseInt(amountSet));
    }
    if (typeof amountSet === 'number') {
      setAmount(amountSet);
    }
  };
  const handleSelectDate = (selectedDate: Date | null) => setDate(selectedDate!);
  const resetValues = () => {
    setType(undefined!);
    setSubtype(undefined!);
    setAmount(undefined!);
    setDate(undefined!);
    setComment(undefined!);
  };
  const onClose = () => {
    resetValues();
    handleClose();
  };
  const onAddExpense = (expenseToAdd: Expense) => {
    resetValues();
    handleAddExpense(expenseToAdd)
  };
  return (
    <>
      <Modal open={open} onClose={onClose} backdrop="static">
        <Modal.Header>
          <Modal.Title>Añadir gasto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ padding: "5px" }}>Tipo</div>
          <InputPicker size="lg" data={TYPES} placeholder=" " value={type} onSelect={handleSelectType} style={{width: "100%", marginBottom: "10px"}} />
          <div style={{ padding: "5px" }}>Subtipo</div>
          <InputPicker size="lg" data={subtypes} placeholder=" " value={subtype} onSelect={setSubtype} style={{width: "100%", marginBottom: "10px"}} />
          <div style={{ padding: "5px" }}>Cantidad</div>
          <InputNumber size="lg" postfix="€" placeholder=" " value={amount} onChange={handleSetAmount} style={{width: "100%", marginBottom: "10px"}} />
          <div style={{ padding: "5px" }}>Fecha</div>
          <DatePicker size="lg" placeholder="&nbsp;" value={date} onChange={handleSelectDate} style={{width: "100%", marginBottom: "10px"}} />
          <div style={{ padding: "5px" }}>Comentario</div>
          <Input size="lg" placeholder=" " value={comment} onChange={setComment} style={{width: "100%"}} />
        </Modal.Body>
        <Modal.Footer>
          <Button appearance="primary" color="green" onClick={() => {
            const expenseToAdd: Expense = {
              groupId: localStorage.getItem('token') || '',
              type,
              subtype,
              amount,
              date,
              comment,
            };
            onAddExpense(expenseToAdd);
          }}>
            Add
          </Button>
          <Button onClick={onClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddExpense;

import { useState } from "react";
import { Button, DatePicker, Input, InputNumber, InputPicker, Modal } from "rsuite";
import { ItemDataType } from "rsuite/esm/@types/common";
import { Expense, TYPES, SUBTYPES } from "../Expense";

type AddExpenseType = {
  open: boolean;
  handleClose: () => void;
  handleAddExpense: (expense: Expense) => void;
};

function AddExpense({ open, handleClose, handleAddExpense }: AddExpenseType): JSX.Element {
  const [type, setType] = useState<string>(undefined!);
  const [subtype, setSubtype] = useState<string>(undefined!);
  const [amount, setAmount] = useState<number>(undefined!);
  const [date, setDate] = useState<Date>(undefined!);
  const [comment, setComment] = useState<string>(undefined!);
  const [subtypes, setSubtypes] = useState<ItemDataType[]>([]);
  const selectType = (selectedType: string) => {
    setType(selectedType);
    setSubtypes(SUBTYPES[selectedType]);
  };
  const selectAmount = (amountSet: string | number) => {
    if (typeof amountSet === 'string') {
      setAmount(parseInt(amountSet));
    }
    if (typeof amountSet === 'number') {
      setAmount(amountSet);
    }
  };
  const selectDate = (selectedDate: Date | null) => setDate(selectedDate!);
  const resetValues = () => {
    setType(undefined!);
    setSubtype(undefined!);
    setAmount(undefined!);
    setDate(undefined!);
    setComment(undefined!);
  };
  const close = () => {
    resetValues();
    handleClose();
  };
  const addExpense = () => {
    const expenseToAdd: Expense = {
      groupId: localStorage.getItem('token') || '',
      type,
      subtype,
      amount,
      date,
      comment,
    };
    handleAddExpense({...expenseToAdd});
  };

  return (
    <>
      <Modal open={open} onClose={close} backdrop="static">
        <Modal.Header>
          <Modal.Title>Añadir gasto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ padding: "5px" }}>Tipo</div>
          <InputPicker size="lg" data={TYPES} placeholder=" " value={type} onSelect={selectType} style={{width: "100%", marginBottom: "10px"}} />
          <div style={{ padding: "5px" }}>Subtipo</div>
          <InputPicker size="lg" data={subtypes} placeholder=" " value={subtype} onSelect={setSubtype} style={{width: "100%", marginBottom: "10px"}} />
          <div style={{ padding: "5px" }}>Cantidad</div>
          <InputNumber size="lg" postfix="€" placeholder=" " value={amount} onChange={selectAmount} style={{width: "100%", marginBottom: "10px"}} />
          <div style={{ padding: "5px" }}>Fecha</div>
          <DatePicker size="lg" placeholder="&nbsp;" value={date} onChange={selectDate} style={{width: "100%", marginBottom: "10px"}} />
          <div style={{ padding: "5px" }}>Comentario</div>
          <Input size="lg" placeholder=" " value={comment} onChange={setComment} style={{width: "100%"}} />
        </Modal.Body>
        <Modal.Footer>
          <Button appearance="primary" color="green" onClick={addExpense}>
            Add
          </Button>
          <Button onClick={close} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddExpense;

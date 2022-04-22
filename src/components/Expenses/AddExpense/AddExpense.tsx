import { useState } from "react";
import { Button, DatePicker, Input, InputNumber, InputPicker, Modal } from "rsuite";
import { ItemDataType } from "rsuite/esm/@types/common";
import { Expense } from "../Expense";

const OTHERS = "Otros";
const HOME_ACCESSORIES = "Complementos casa";
const PHARMACY = "Farmacia";
const ENTRY = "Ingreso";
const LEISURE = "Ocio";
const RECEIPT = "Recibo";
const PRESENT = "Regalos";
const ACCESSORIES = "Ropa / Complementos";
const SUPERMARKET = "Supermercado";
const TRANSPORT = "Transporte";

const EXPENSE_TYPES = [
  { label: HOME_ACCESSORIES, value: HOME_ACCESSORIES },
  { label: PHARMACY, value: PHARMACY },
  { label: ENTRY, value: ENTRY },
  { label: LEISURE, value: LEISURE },
  { label: RECEIPT, value: RECEIPT },
  { label: PRESENT, value: PRESENT },
  { label: ACCESSORIES, value: ACCESSORIES },
  { label: SUPERMARKET, value: SUPERMARKET },
  { label: TRANSPORT, value: TRANSPORT },
  { label: OTHERS, value: OTHERS },
];
const SUBTYPES: { [key: string]: ItemDataType[] } = {
  [HOME_ACCESSORIES]: [
    { label: "-", value: "-" }
  ],
  [PHARMACY]: [
    { label: "-", value: "-" }
  ],
  [ENTRY]: [
    { label: "Sueldo Edu", value: "Sueldo Edu" },
    { label: "Sueldo MJ", value: "Sueldo MJ" },
    { label: OTHERS, value: OTHERS }
  ],
  [LEISURE]: [
    { label: "-", value: "-" }
  ],
  [RECEIPT]: [
    { label: "Agua", value: "Agua" },
    { label: "Alquiler", value: "Alquiler" },
    { label: "Col·legi Periodistes", value: "Col·legi Periodistes" },
    { label: "Gimansio", value: "Gimansio" },
    { label: "Luz", value: "Luz" },
    { label: "Teléfono / Internet", value: "Teléfono / Internet" },
    { label: "UGT", value: "UGT" },
    { label: OTHERS, value: OTHERS },
  ],
  [PRESENT]: [
    { label: "-", value: "-" }
  ],
  [ACCESSORIES]: [
    { label: "-", value: "-" }
  ],
  [SUPERMARKET]: [
    { label: "BonArea", value: "BonArea" },
    { label: "Clarel", value: "Clarel" },
    { label: "Condis", value: "Condis" },
    { label: "Consum", value: "Consum" },
    { label: "Dia", value: "Dia" },
    { label: "Frutería", value: "Frutería" },
    { label: "Mercadona", value: "Mercadona" },
    { label: "Panadería", value: "Panadería" },
    { label: OTHERS, value: OTHERS },
  ],
  [TRANSPORT]: [
    { label: "-", value: "-" }
  ],
  [OTHERS]: [
    { label: "-", value: "-" }
  ],
};

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
  const handleSelectSubtype = (selectedSubtype: string) => setSubtype(selectedSubtype);
  const handleSetAmount = (amountSet: string | number) => {
    if (typeof amountSet === 'string') {
      setAmount(parseInt(amountSet));
    }
    if (typeof amountSet === 'number') {
      setAmount(amountSet);
    }
  };
  const handleSelectDate = (selectedDate: Date) => setDate(selectedDate);
  const handleSetComment = (commentSet: string) => setComment(commentSet);
  const onClose = () => {
    setType(undefined!);
    setSubtype(undefined!);
    setAmount(undefined!);
    setDate(undefined!);
    setComment(undefined!);
    handleClose();
  };
  return (
    <>
      <Modal open={open} onClose={onClose} backdrop="static">
        <Modal.Header>
          <Modal.Title>Add Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ padding: "5px" }}>Tipo</div>
          <InputPicker size="lg" data={EXPENSE_TYPES} placeholder=" " onSelect={handleSelectType} style={{width: "100%", marginBottom: "10px"}} />
          <div style={{ padding: "5px" }}>Subtipo</div>
          <InputPicker size="lg" data={subtypes} placeholder=" " onSelect={handleSelectSubtype} style={{width: "100%", marginBottom: "10px"}} />
          <div style={{ padding: "5px" }}>Cantidad</div>
          <InputNumber size="lg" postfix="€" placeholder=" " onChange={handleSetAmount} style={{width: "100%", marginBottom: "10px"}} />
          <div style={{ padding: "5px" }}>Fecha</div>
          <DatePicker size="lg" placeholder="&nbsp;" onSelect={handleSelectDate} style={{width: "100%", marginBottom: "10px"}} />
          <div style={{ padding: "5px" }}>Comentario</div>
          <Input size="lg" placeholder=" " onChange={handleSetComment} style={{width: "100%"}} />
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
            handleAddExpense(expenseToAdd);
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

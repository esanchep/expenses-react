import { ItemDataType } from "rsuite/esm/@types/common";
import { SelectDataType } from "../Form/Select/Select";

export type Expense = {
    id?: string;
    groupId: string;
    type: string;
    subtype: string;
    amount: number;
    date: Date;
    comment: string;
};

export const OTHERS = "Otros";
export const HOME_ACCESSORIES = "Complementos casa";
export const PHARMACY = "Farmacia";
export const ENTRY = "Ingreso";
export const LEISURE = "Ocio";
export const RECEIPT = "Recibo";
export const PRESENT = "Regalos";
export const ACCESSORIES = "Ropa / Complementos";
export const SUPERMARKET = "Supermercado";
export const TRANSPORT = "Transporte";

export const TYPES = [
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
export const SUBTYPES: { [key: string]: ItemDataType[] } = {
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

export const FILTER_TYPES = [
  { label: '', value: undefined },
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
// export const FILTER_SUBTYPES: { [key: string]: ItemDataType[] } = {
export const FILTER_SUBTYPES: { [key: string]: SelectDataType[] } = {
  [HOME_ACCESSORIES]: [],
  [PHARMACY]: [],
  [ENTRY]: [
    { label: '', value: undefined },
    { label: "Sueldo Edu", value: "Sueldo Edu" },
    { label: "Sueldo MJ", value: "Sueldo MJ" },
    { label: OTHERS, value: OTHERS }
  ],
  [LEISURE]: [],
  [RECEIPT]: [
    { label: '', value: undefined },
    { label: "Agua", value: "Agua" },
    { label: "Alquiler", value: "Alquiler" },
    { label: "Col·legi Periodistes", value: "Col·legi Periodistes" },
    { label: "Gimansio", value: "Gimansio" },
    { label: "Luz", value: "Luz" },
    { label: "Teléfono / Internet", value: "Teléfono / Internet" },
    { label: "UGT", value: "UGT" },
    { label: OTHERS, value: OTHERS },
  ],
  [PRESENT]: [],
  [ACCESSORIES]: [],
  [SUPERMARKET]: [
    { label: '', value: undefined },
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
  [TRANSPORT]: [],
  [OTHERS]: [],
};

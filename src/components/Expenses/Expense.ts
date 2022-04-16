export type Expense = {
    id?: string;
    groupId: string;
    type: string;
    subtype: string;
    amount: number;
    date: Date;
    comment: string;
};

export type ExpenseItem = {
    id: string;
    groupId: string;
    type: string;
    subtype: string;
    amount: string;
    date: string;
    comment: string;
};

type Expense = {
    id: string;
    groupId: string;
    type: string;
    subtype: string;
    amount: number;
    date: Date;
    comment: string;
};

export default Expense;

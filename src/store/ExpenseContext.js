import React from "react";

const ExpenseContext = React.createContext({
  expenses: [],
  totalAmount: 0,
  addExpense: (expense) => {},
  removeExpense: (id) => {},
});

export default ExpenseContext;

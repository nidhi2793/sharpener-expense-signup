import React, { useContext, useEffect } from "react";
import ExpenseContext from "./ExpenseContext";
import { useReducer } from "react";
import AuthContext from "./authContext";

let defaultExpenseState = {
  expenses: [],
  totalAmount: 0,
};

const ExpenseReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount = state.totalAmount + action.expense.expenseAmount;

    const updatedExpense = state.expenses.concat(action.expense);

    return {
      expenses: updatedExpense,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingExpensesIndex = state.expenses.findIndex(
      (expense) => expense.id === action.id
    );
    const existingExpense = state.expenses[existingExpensesIndex];
    const updatedTotalAmount =
      state.totalAmount - existingExpense.expenseAmount;

    const updatedExpense = state.expenses.filter(
      (expense) => expense.id !== action.id
    );

    return {
      expenses: updatedExpense,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultExpenseState;
};

const ExpenseProvider = (props) => {
  const [expenseState, dispatchExpenseAction] = useReducer(
    ExpenseReducer,
    defaultExpenseState
  );

  const addExpenseHandler = (expense) => {
    dispatchExpenseAction({ type: "ADD", expense: expense });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchExpenseAction({ type: "REMOVE", id: id });
  };

  const expenseContext = {
    expenses: expenseState.expenses,
    totalAmount: expenseState.totalAmount,
    addExpense: addExpenseHandler,
    removeExpense: removeItemFromCartHandler,
  };

  return (
    <ExpenseContext.Provider value={expenseContext}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;

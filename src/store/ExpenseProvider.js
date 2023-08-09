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
    return {
      expenses: action.expenses,
      totalAmount: action.totalAmount,
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
  const editedEmail = localStorage
    .getItem("email")
    .replace("@", "")
    .replace(".", "");

  const [expenseState, dispatchExpenseAction] = useReducer(
    ExpenseReducer,
    defaultExpenseState
  );
  useEffect(() => {
    const setDefaultValue = async () => {
      await fetch(
        `https://expensetacker2-default-rtdb.firebaseio.com/expense/${editedEmail}.json`
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          dispatchExpenseAction({
            type: "ADD",
            expenses: data?.expenses || [],
            totalAmount: data?.totalAmount || 0,
          });
          console.log(data);
        })
        .catch((err) => console.log(err));
    };
    if (editedEmail) {
      setDefaultValue();
    }
  }, [editedEmail]);

  const addExpenseHandler = async (expense) => {
    console.log(expense);
    const updatedTotalAmount = expenseState.totalAmount + expense.expenseAmount;

    const updatedExpense = expenseState.expenses.concat(expense);

    dispatchExpenseAction({
      type: "ADD",
      expenses: updatedExpense,
      totalAmount: updatedTotalAmount,
    });
    await fetch(
      `https://expensetacker2-default-rtdb.firebaseio.com/expense/${editedEmail}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          expenses: updatedExpense,
          totalAmount: updatedTotalAmount,
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
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

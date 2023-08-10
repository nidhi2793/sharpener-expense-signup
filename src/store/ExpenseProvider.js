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
  if (action.type === "CLEAR") {
    return {
      products: action.products,
      totalAmount: action.totalAmount,
    };
  }
  if (action.type === "REMOVE") {
    return {
      expenses: action.updatedExpense,
      totalAmount: action.updatedTotalAmount,
    };
  }

  return defaultExpenseState;
};

const ExpenseProvider = (props) => {
  const authCntxt = useContext(AuthContext);

  let editedEmail;
  if (localStorage.getItem("email")) {
    editedEmail = localStorage
      .getItem("email")
      .replace("@", "")
      .replace(".", "");
  } else {
    editedEmail = "";
  }

  const [expenseState, dispatchExpenseAction] = useReducer(
    ExpenseReducer,
    defaultExpenseState
  );
  useEffect(() => {
    console.log("effect", editedEmail);
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
  console.log("editedEmail: ", editedEmail);

  const addExpenseHandler = async (expense) => {
    const updatedTotalAmount = expenseState.totalAmount + expense.expenseAmount;

    const updatedExpense = (expenseState.expenses || []).concat(expense);

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

  const removeExpenseHandler = async (id) => {
    const existingExpensesIndex = expenseState.expenses.findIndex(
      (expense) => expense.id === id
    );
    const existingExpense = expenseState.expenses[existingExpensesIndex];
    const updatedTotalAmount =
      expenseState.totalAmount - existingExpense.expenseAmount;

    const updatedExpense = expenseState.expenses.filter(
      (expense) => expense.id !== id
    );
    dispatchExpenseAction({ type: "REMOVE", id: id });
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

  const clearExpensesHandler = () => {
    dispatchExpenseAction({ type: "CLEAR", expenses: [], totalAmount: 0 });
  };

  const expenseContext = {
    expenses: expenseState.expenses,
    totalAmount: expenseState.totalAmount,
    addExpense: addExpenseHandler,
    removeExpense: removeExpenseHandler,
    clearExpense: clearExpensesHandler,
  };

  return (
    <ExpenseContext.Provider value={expenseContext}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;

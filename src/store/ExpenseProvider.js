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
    return {
      expenses: action.updatedExpense,
      totalAmount: action.updatedTotalAmount,
    };
  }

  return defaultExpenseState;
};

const ExpenseProvider = (props) => {
  // Removing @ and . from email to use in firebase
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

  //fetching data from firebase after login//
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

  //Adding Expense to database//

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
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  //Removing Expense from database//

  const removeExpenseHandler = async (id, cb = () => {}) => {
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
      .then((data) => {
        cb(true);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const expenseContext = {
    expenses: expenseState.expenses,
    totalAmount: expenseState.totalAmount,
    addExpense: addExpenseHandler,
    removeExpense: removeExpenseHandler,
  };

  return (
    <ExpenseContext.Provider value={expenseContext}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;

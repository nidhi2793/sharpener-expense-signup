import { useContext } from "react";
import ExpenseContext from "../store/ExpenseContext";

import Card from "./UI/Card";

function TotalAmount(props) {
  const expenseCtx = useContext(ExpenseContext);

  const totalAmount = (expenseCtx.totalAmount || 0)
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <Card>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <h3 style={{ marginRight: 20 }}>Total Expense:</h3>
        <span>Rs {totalAmount}</span>
      </div>
    </Card>
  );
}

export default TotalAmount;

import React from "react";

const SingleExpense = (props) => {
  return (
    <div>
      <li>
        <div>
          <span>{props.description}</span>
          <span>{props.expenseAmount}</span>
          <span>{props.category}</span>
        </div>
      </li>
    </div>
  );
};

export default SingleExpense;

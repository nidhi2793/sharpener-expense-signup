import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext } from "react";
import ExpenseContext from "../store/ExpenseContext";
import AuthContext from "../store/authContext";
import { Button } from "@mui/material";
import { Navigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "darkgray",
    color: theme.palette.common.black,
    fontSize: 18,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(description, expenseAmount, category, id) {
  return { description, expenseAmount, category, id };
}

export default function ExpenseTable(props) {
  const ExpenseCntxt = useContext(ExpenseContext);

  const rows = (ExpenseCntxt.expenses || []).map((expense) =>
    createData(
      expense.description,
      expense.expenseAmount,
      expense.category,
      expense.id
    )
  );

  const expenseRemoveHandler = (id) => {
    ExpenseCntxt.removeExpense(id, (remove) => {
      if (remove) {
        window.location.reload(false);
      }
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Expense Description</StyledTableCell>
            <StyledTableCell>ExpenseAmount</StyledTableCell>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.description}>
              <StyledTableCell component="th" scope="row">
                {row.description}
              </StyledTableCell>
              <StyledTableCell>
                Rs{" "}
                {row.expenseAmount
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </StyledTableCell>
              <StyledTableCell>{row.category}</StyledTableCell>
              <StyledTableCell>
                <Button variant="contained" color="success">
                  {" "}
                  Edit
                </Button>
              </StyledTableCell>

              <StyledTableCell>
                <Button
                  variant="contained"
                  color="error"
                  onClick={expenseRemoveHandler.bind(null, row.id)}
                >
                  {" "}
                  Delete
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

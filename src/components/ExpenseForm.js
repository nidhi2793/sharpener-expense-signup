import * as React from "react";
import { useRef } from "react";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { v4 as uuidv4 } from "uuid";
import ExpenseContext from "../store/ExpenseContext";
import ExpenseTable from "./ExpenseTable";
import TotalAmount from "./TotalAmount";
import Card from "./UI/Card";

const defaultTheme = createTheme();

export default function ExpenseForm() {
  const [category, setCategory] = React.useState("");
  const ExpenseCntxt = React.useContext(ExpenseContext);
  const hasItems = (ExpenseCntxt.expenses || []).length > 0;
  const descriptionRef = useRef();
  const expenseAmountRef = useRef();
  const categoryRef = useRef();

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const addExpenseHandler = (event) => {
    event.preventDefault();

    let expense = {
      description: descriptionRef.current.value,
      expenseAmount: +expenseAmountRef.current.value,
      category: categoryRef.current.value,
      id: uuidv4(),
    };
    // console.log("expense", expense);

    ExpenseCntxt.addExpense({
      id: expense.id,
      description: expense.description,
      category: expense.category,
      expenseAmount: expense.expenseAmount,
    });
    event.target.reset();
    setCategory("");
    console.log(expense);
  };

  const handleEdit = (ExpenseToEdit) => {
    console.log(ExpenseToEdit);
    descriptionRef.current.value = ExpenseToEdit.description;
    expenseAmountRef.current.value = ExpenseToEdit.expenseAmount;
    setCategory(ExpenseToEdit.category);
    ExpenseCntxt.removeExpense(ExpenseToEdit.id);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="l">
        <Card>
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 5,
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#19376D" }}
            >
              Add New Expense
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={addExpenseHandler}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                mt: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box>
                <InputLabel id="demo-simple-label">
                  Expense Description:
                </InputLabel>
                <TextField
                  style={{ margin: 10 }}
                  required
                  inputRef={descriptionRef}
                  id="description"
                  // label="Description"
                  name="description"
                  autoFocus
                />
              </Box>

              <Box>
                <InputLabel id="demo-simple-label">Expense Amount:</InputLabel>
                <TextField
                  style={{ margin: 10 }}
                  required
                  inputRef={expenseAmountRef}
                  name="expenseAmount"
                  // label="Expense Amount"
                  type="number"
                  id="expenseAmount"
                />
              </Box>
              <Box>
                <InputLabel id="demo-simple-label">Category:</InputLabel>
                <Select
                  style={{ minWidth: 100 }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="category"
                  inputRef={categoryRef}
                  value={category}
                  onChange={handleChange}
                  // label="category"
                >
                  <MenuItem value={"Food"}>Food</MenuItem>
                  <MenuItem value={"Clothes"}>Clothes</MenuItem>
                  <MenuItem value={"Grocery"}>Grocery</MenuItem>
                  <MenuItem value={"Health"}>Health</MenuItem>
                  <MenuItem value={"Rent"}>Rent</MenuItem>
                  <MenuItem value={"Education"}>Education</MenuItem>
                  <MenuItem value={"Travel"}>Travel</MenuItem>
                  <MenuItem value={"Others"}>Others</MenuItem>
                </Select>
              </Box>
              <Box>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{ margin: 10 }}
                >
                  Add Expense
                </Button>
              </Box>
            </Box>
          </Box>
        </Card>
      </Container>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {hasItems && <TotalAmount />}
        {hasItems && <ExpenseTable onEdit={handleEdit} />}
        {/* {!hasItems && (
          <Card>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontWeight: "bold",
              }}
            >
              <Typography variant="h5">No Expense Recorded.</Typography>
            </div>
          </Card>
        )} */}
      </Container>
    </ThemeProvider>
  );
}

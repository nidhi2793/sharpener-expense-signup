import * as React from "react";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import { v4 as uuidv4 } from "uuid";
import ExpenseContext from "../store/ExpenseContext";
import { Category } from "@mui/icons-material";
import ExpenseTable from "./ExpenseTable";
import TotalAmount from "./TotalAmount";
import Card from "./UI/Card";

const defaultTheme = createTheme();

export default function ExpenseFormForm() {
  const [category, setCategory] = React.useState("");
  const ExpenseCntxt = React.useContext(ExpenseContext);
  const hasItems = (ExpenseCntxt.expenses || []).length > 0;

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const addExpenseHandler = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    let expense = {
      description: data.get("description"),
      expenseAmount: +data.get("expenseAmount"),
      category: data.get("category"),
      id: uuidv4(),
    };
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

  const handleEdit = (data) => {
    console.log(data);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="l">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 5,
          }}
        >
          <Typography variant="h5">Add New Expense</Typography>
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
            }}
          >
            <TextField
              style={{ margin: 10 }}
              required
              id="description"
              label="Description"
              name="description"
              autoFocus
            />
            <TextField
              style={{ margin: 10 }}
              required
              name="expenseAmount"
              label="Expense Amount"
              type="number"
              id="expenseAmount"
            />
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              style={{ minWidth: 100 }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="category"
              value={category}
              onChange={handleChange}
              label="category"
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
        {!hasItems && (
          <Card>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontWeight: "bold",
              }}
            >
              <Typography variant="h5">No Expenses Recorded.</Typography>
            </div>
          </Card>
        )}
      </Container>
    </ThemeProvider>
  );
}

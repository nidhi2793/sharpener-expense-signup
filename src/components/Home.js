import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AuthContext from "../store/authContext";
import { useNavigate } from "react-router-dom";
import ExpenseForm from "./ExpenseForm";
import TotalAmount from "./TotalAmount";
import ExpenseTable from "./ExpenseTable";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useContext } from "react";
import ExpenseContext from "../store/ExpenseContext";
import logo from "../assets/expenses.png";

export default function Header() {
  const authCntxt = React.useContext(AuthContext);
  const expenseCtx = useContext(ExpenseContext);
  const hasExpenses = expenseCtx.expenses.length > 0;
  const navigate = useNavigate();
  const handleLogout = () => {
    authCntxt.logout();
    navigate("/login");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "white" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            style={{
              color: "black",
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              fontWeight: "bold",
            }}
          >
            <img src={logo} style={{ height: 50, padding: 5, margin: 5 }}></img>
            {/* <CurrencyRupeeIcon /> */}
            Welcome to Expense Tacker !!!
          </Typography>
          {authCntxt.isLoggedIn && (
            <Button onClick={handleLogout} style={{ margin: 10 }}>
              Log Out
            </Button>
          )}
          <Typography color="black">
            Your profile is incomplete.{" "}
            <Link underline="hover" color="blue" href="/profileform">
              Complete now.
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <ExpenseForm />
      {hasExpenses && <TotalAmount />}

      {hasExpenses && <ExpenseTable />}
    </Box>
  );
}

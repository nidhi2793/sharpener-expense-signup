import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import AuthContext from "../store/authContext";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import ExpenseForm from "./ExpenseForm";
import TotalAmount from "./TotalAmount";
import ExpenseTable from "./ExpenseTable";
import { useContext } from "react";
import ExpenseContext from "../store/ExpenseContext";
import logo from "../assets/expenses.png";
import ProfileForm from "./ProfileForm";

export default function Header() {
  const authCntxt = React.useContext(AuthContext);
  const expenseCtx = useContext(ExpenseContext);
  // const hasExpenses = expenseCtx.expenses.length > 0;
  const navigate = useNavigate();
  const location = useLocation();
  const isLocation = location.pathname === "/profileform";
  const handleLogout = () => {
    authCntxt.logout();
    localStorage.removeItem("email");
    navigate("/login");
    expenseCtx.clearExpense();
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#4477CE" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            style={{
              color: "white",
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          >
            <img src={logo} style={{ height: 50, padding: 5, margin: 5 }}></img>
            {/* <CurrencyRupeeIcon /> */}
            Welcome to Expense Tracker !!!
          </Typography>
          {authCntxt.isLoggedIn && (
            <Button
              onClick={handleLogout}
              style={{ margin: 10, color: "white" }}
            >
              Log Out
            </Button>
          )}
          {authCntxt.isLoggedIn && (
            <Typography color="black">
              Your profile is incomplete.{" "}
              <Button
                onClick={() => navigate("/profileform")}
                style={{ color: "white", fontStyle: "italic" }}
              >
                Complete now.
              </Button>
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

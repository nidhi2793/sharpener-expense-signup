import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AuthContext from "../store/authContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/expenses.png";

export default function Header() {
  const authCntxt = React.useContext(AuthContext);
  // const hasExpenses = expenseCtx.expenses.length > 0;
  const navigate = useNavigate();

  const user = localStorage.getItem("name")
    ? localStorage.getItem("name")
    : "User";
  const handleLogout = () => {
    authCntxt.logout();
    localStorage.clear();
    navigate("/login");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#4477CE" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 0.5 }}
            style={{
              color: "white",
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          >
            <img
              src={logo}
              alt="logo"
              style={{ height: 50, padding: 5, margin: 5 }}
            ></img>
            {/* <CurrencyRupeeIcon /> */}
            Welcome to Expense Tracker !!!{"      "}
          </Typography>
          <Typography style={{ margin: 10, padding: 5 }} sx={{ flexGrow: 0.5 }}>
            Hello {user} !!
          </Typography>

          {authCntxt.isLoggedIn && (
            <>
              <Button
                onClick={() => navigate("/home")}
                style={{ color: "white" }}
              >
                {" "}
                Home
              </Button>

              <Button
                onClick={() => navigate("/profileform")}
                style={{ color: "white" }}
              >
                Profile
              </Button>
            </>
          )}
          {authCntxt.isLoggedIn && (
            <Button
              onClick={handleLogout}
              style={{ margin: 10, color: "white" }}
            >
              Log Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

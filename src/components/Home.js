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

export default function Header() {
  const authCntxt = React.useContext(AuthContext);
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
            style={{ color: "black" }}
          >
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
    </Box>
  );
}

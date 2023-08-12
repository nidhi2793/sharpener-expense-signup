import "./App.css";
import SignUp from "./components/SignUp";
import LogIn from "./components/Login";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import ProfileForm from "./components/ProfileForm";
import EmailVerification from "./components/EmailVerification";
import ForgotPassword from "./components/ForgotPassword";
import ExpenseProvider from "./store/ExpenseProvider";
import { useContext, useState } from "react";

import Home from "./Home";
import { createContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { authActions } from "./store/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isDarkMode = useSelector((state) => state.theme.isDark);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <ExpenseProvider>
          <Header />
          {!isLoggedIn && (
            <Routes>
              <Route exact path="/" element={<SignUp />}></Route>
              <Route
                exact
                path="/forgotpassword"
                element={<ForgotPassword />}
              ></Route>
              <Route path="*" element={<LogIn />}></Route>
            </Routes>
          )}
          {isLoggedIn && (
            <Routes>
              <Route exact path="/" element={<SignUp />} />
              <Route exact path="/login" element={<LogIn />} />
              <Route
                exact
                path="/forgotpassword"
                element={<ForgotPassword />}
              ></Route>
              <Route exact path="/home" element={<Home />} />
              {/* <Route exact path="/profileform" element={<ProfileForm />} /> */}
              <Route
                exact
                path="/emailverification"
                element={<EmailVerification />}
              />
            </Routes>
          )}
        </ExpenseProvider>
      </Box>
    </ThemeProvider>
  );
}

export default App;

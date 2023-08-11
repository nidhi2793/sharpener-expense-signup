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
import AuthContext from "./store/authContext";
import Home from "./Home";
import { createContext } from "react";

export const ThemeContext = createContext(null);

function App() {
  const authCntxt = useContext(AuthContext);
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div id={theme}>
        <ExpenseProvider>
          <Header />
          {!authCntxt.isLoggedIn && (
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
          {authCntxt.isLoggedIn && (
            <Routes>
              <Route exact path="/" element={<SignUp />} />
              <Route exact path="/login" element={<LogIn />} />
              <Route
                exact
                path="/forgotpassword"
                element={<ForgotPassword />}
              ></Route>
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/profileform" element={<ProfileForm />} />
              <Route
                exact
                path="/emailverification"
                element={<EmailVerification />}
              />
            </Routes>
          )}
        </ExpenseProvider>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;

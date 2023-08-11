import "./App.css";
import SignUp from "./components/SignUp";
import LogIn from "./components/Login";
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Navigate,
} from "react-router-dom";
import ProfileForm from "./components/ProfileForm";
import EmailVerification from "./components/EmailVerification";
import ForgotPassword from "./components/ForgotPassword";
import ExpenseProvider from "./store/ExpenseProvider";
import { useContext } from "react";
import AuthContext from "./store/authContext";
import SignBg from "../src/components/SignBg";
import Home from "./Home";

function App() {
  const authCntxt = useContext(AuthContext);
  return (
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
  );
}

export default App;

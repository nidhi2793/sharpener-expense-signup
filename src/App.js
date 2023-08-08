import "./App.css";
import SignUp from "./components/SignUp";
import LogIn from "./components/Login";
import Header from "./components/Home";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import ProfileForm from "./components/ProfileForm";
import EmailVerification from "./components/EmailVerification";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<SignUp />} />
          <Route exact path="/login" element={<LogIn />} />
          <Route exact path="/forgotpassword" element={<ForgotPassword />} />
          <Route exact path="/home" element={<Header />} />
          <Route exact path="/profileform" element={<ProfileForm />} />
          <Route
            exact
            path="/emailverification"
            element={<EmailVerification />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;

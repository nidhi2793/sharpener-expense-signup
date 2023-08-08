import "./App.css";
import SignIn from "./components/SignUp";
import LogIn from "./components/Login";
import Header from "./components/Home";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route exact path="/login" element={<LogIn />} />
          <Route exact path="/home" element={<Header />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

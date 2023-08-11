import React, { useContext, useState } from "react";
import ExpenseContext from "./ExpenseContext";

const AuthContext = React.createContext({
  token: "",
  email: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  // const initialEmail = localStorage.getItem("email");
  const [idtoken, setToken] = useState(initialToken);
  const [email, setEmail] = useState("");

  const userIsLoggedIn = !!idtoken;
  console.log("email: ", email);
  const handleLogIn = async (token, email, cb = () => {}) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    setEmail(localStorage.getItem("email"));
    setToken(localStorage.getItem("token"));
    cb(true);
  };

  const handleLogOut = () => {
    setToken(null);
    setEmail("");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  const contextValue = {
    token: idtoken,
    email: email,
    isLoggedIn: userIsLoggedIn,
    login: handleLogIn,
    logout: handleLogOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext({
  token: "",
  email: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [idtoken, setToken] = useState(initialToken);
  const [email, setEmail] = useState("");

  const userIsLoggedIn = !!idtoken;

  const handleLogIn = (token, email) => {
    console.log(idtoken);
    setToken(token);
    console.log(idtoken);
    setEmail(email);
    localStorage.setItem("token", token);
  };

  const handleLogOut = () => {
    setToken(null);
    setEmail("");
    localStorage.removeItem("token");
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

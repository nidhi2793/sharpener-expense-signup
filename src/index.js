import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/authContext";
import { CustomBrowserRouter } from "../src/components/customBrowserRouter";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <React.StrictMode>
      <CustomBrowserRouter>
        <App />
      </CustomBrowserRouter>
    </React.StrictMode>
  </AuthContextProvider>
);

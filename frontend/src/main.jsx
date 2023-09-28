import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { AuthContextProvider } from "./context/AuthContext.jsx";
import { UsersContextProvider } from "./context/UsersContext.jsx";
import { ContractsContextProvider } from "./context/ContractsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthContextProvider>
    <UsersContextProvider>
      <ContractsContextProvider>
        <App />
      </ContractsContextProvider>
    </UsersContextProvider>
  </AuthContextProvider>
  // </React.StrictMode>
);

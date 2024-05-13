import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import UserContextProvider from "./Context/UserContext";
import NoteContextProvider from "./Context/NoteContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <NoteContextProvider>
      <App />
    </NoteContextProvider>
  </UserContextProvider>
);

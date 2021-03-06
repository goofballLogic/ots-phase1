import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./auth/gapi";
import "./storage/gapi-drive";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
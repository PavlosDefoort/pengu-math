import math, { parse } from "mathjs";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

var Latex = require("react-latex");

const root = ReactDOM.createRoot(document.getElementById("root"));

const fraction =
  "Evaluate the following limit: $\\lim_{x \\to \\propto} \\sin(x)$";

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

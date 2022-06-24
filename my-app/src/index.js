import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { UserAuthContextProvider } from "./context/UserAuthContext";

<script src="/_/firebase/7.0.0/firebase-database.js"></script>;
<script src="/_/firebase/7.0.0/firebase-storage.js"></script>;
<script src="/_/firebase/init.js"></script>;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserAuthContextProvider>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </UserAuthContextProvider>
);

reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/Auth/AuthContext.jsx";
import { JobProvider } from "./context/JobApplication/JobContext.jsx";
import { UserProvider } from "./context/User/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <JobProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </JobProvider>
    </AuthProvider>
  </React.StrictMode>
);


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import "../public/css/tailwind.css";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { ClientProvider } from "./context/ClientContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ClientProvider>
          <ThemeProvider>
            <MaterialTailwindControllerProvider>
                <Toaster />
                <App />
            </MaterialTailwindControllerProvider>
          </ThemeProvider>
        </ClientProvider>
      </AuthProvider>    
    </BrowserRouter>
  </React.StrictMode>
);

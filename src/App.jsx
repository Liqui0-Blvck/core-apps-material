import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import AuthContext from "./context/AuthContext";
import React, { useContext } from "react";

const PrivateRoute = ({ element, ...props }) => {
  const { authTokens } = useContext(AuthContext);
  const currentPath = useLocation().pathname;

  const isValidPath = () => {
    // Validar si la ruta comienza con "/app"
    return currentPath.startsWith("/app");
  };

  return authTokens ? (
    React.cloneElement(element, props)
  ) : (
    <Navigate to="/auth/sign-in/" replace />
  );
};

function App() {
  return (
    <Routes>
      {/* Rutas protegidas */}
      <Route path="app/*" element={<PrivateRoute element={<Dashboard />} />} />

      {/* Rutas de autenticación */}
      <Route path="/auth/*" element={<Auth />} />

      {/* Redirige cualquier ruta no válida o no autenticada al dashboard */}
      <Route
        path="/*"
        element={<PrivateRoute element={<Navigate to="/app/home" replace />} />}
      />
    </Routes>
  );
}

export default App;

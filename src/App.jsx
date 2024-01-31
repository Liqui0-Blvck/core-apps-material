import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { Toaster } from "react-hot-toast";
import Item from "./componentes/Item/ItemList";
import React, { useContext } from "react";
import AuthContext from "./context/AuthContext";

const PrivateRoute = ({ element, ...props }) => {
  const { authTokens } = useContext(AuthContext);

  return authTokens ? (
    React.cloneElement(element, props)
  ) : (
    <Navigate to="/auth/sign-in" replace />
  );
};

function App() {
  return (
    <Routes>
      {/* Rutas protegidas */}
      <Route path="/*" element={<PrivateRoute element={<Dashboard />} />} />

      {/* Rutas de autenticación */}
      <Route path="/auth/*" element={<Auth />} />

      {/* Redirige cualquier ruta no válida o no autenticada */}
      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
    </Routes>
  );
}

export default App;

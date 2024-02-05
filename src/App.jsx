import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import AuthContext from "./context/AuthContext";
import React, { useContext } from "react";

const PrivateRoute = ({ element }) => {
  const { authTokens } = useContext(AuthContext);

  return authTokens ? (
    element
  ) : (
    <Navigate to="/auth/sign-in/" replace />
  );
};

const allowedPaths = [
  "/home",
  "/profile",
  "/tables",
  "/notifications",
  "/registro-item",
  "/item",
  "/edicion-registro/:id",
  "/item/:id",
  "/contenedores",
  "/registro-contenedor",
  "/contenedor/:id",
  "/contenedor/:id",
  "/categorias",
  "/proveedores",
  "/proveedor/:id",
  "/registro-proveedor",
  "/orden-compra",
  "/registro-orden",
  "/orden-compra/:id"
];

function App() {
  const { pathname } = useLocation();
  const isAllowedPath = allowedPaths.includes(pathname);

  return (
    <Routes>
      {/* Rutas de autenticación */}
      <Route path="/auth/*" element={<Auth />} />

      {/* Rutas protegidas */}
      {isAllowedPath ? (
        <Route path="/*" element={<PrivateRoute element={<Dashboard />} />} />
      ) : (
        <Navigate to="/app/home" replace />
      )}
    </Routes>
  );
}

export default App;

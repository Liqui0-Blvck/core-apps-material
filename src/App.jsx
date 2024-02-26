import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import AuthContext from "./context/AuthContext";
import React, { useContext } from "react";
import OrdenDeCompraPDF from "./componentes/pdf/OrdenDeCompraPDF";
import GuiaSalidaPDF from "./componentes/pdf/GuiaSalidaPDF";

const PrivateRoute = ({ element, ...props }) => {
  const { authTokens } = useContext(AuthContext)

  return authTokens ? (
    React.cloneElement(element, props)
  ) : (
    <Navigate to="/auth/sign-in/" replace />
  )
}

function App() {
  return (
    <Routes>
      {/* Rutas protegidas */}
      <Route path="app/*" element={<PrivateRoute element={<Dashboard />} />} />

      {/* Rutas de autenticación */}
      <Route path="/auth/*" element={<Auth />} />
      <Route path="pdf-preview-orden/:id" element={<OrdenDeCompraPDF />} />
      <Route path="pdf-preview-guia/:id" element={<GuiaSalidaPDF />} />

      {/* Redirige cualquier ruta no válida o no autenticada al dashboard */}
      <Route
        path="/*"
        element={<PrivateRoute element={<Navigate to="/app/home" replace />} />}
      />
    </Routes>
  );
}

export default App;

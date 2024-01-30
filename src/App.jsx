import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { Toaster } from "react-hot-toast";
import Item from "./componentes/Item/ItemList";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";

function App() {
  const { authTokens } = useContext(AuthContext)
  return (
    <Routes>
      <Route path="/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      {/* <Route path='' element={<Navigate to="/auth/sign-in" replace />}/> */}
    </Routes>
  );
}

export default App;

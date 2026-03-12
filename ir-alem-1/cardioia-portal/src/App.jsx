import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./contexts/AuthContext";
import RotaProtegida from "./components/RotaProtegida";
import Navbar from "./components/Navbar";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Pacientes from "./pages/Pacientes/Pacientes";
import Agendamento from "./pages/Agendamento/Agendamento";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/dashboard" element={<RotaProtegida><Layout><Dashboard /></Layout></RotaProtegida>} />
      <Route path="/pacientes" element={<RotaProtegida><Layout><Pacientes /></Layout></RotaProtegida>} />
      <Route path="/agendamento" element={<RotaProtegida><Layout><Agendamento /></Layout></RotaProtegida>} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

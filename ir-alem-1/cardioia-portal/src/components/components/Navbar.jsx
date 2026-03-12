import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1>CardioIA Portal</h1>
      <ul className="navbar-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/pacientes">Pacientes</Link></li>
        <li><Link to="/agendamento">Agendamentos</Link></li>
        <li><span style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem" }}>{user?.nome}</span></li>
        <li><button className="btn-logout" onClick={handleLogout}>Sair</button></li>
      </ul>
    </nav>
  );
}

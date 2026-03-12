import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const sucesso = login(email, senha);
    if (sucesso) {
      navigate("/dashboard");
    } else {
      setErro("Email ou senha incorretos. Use: medico@cardioia.com / cardioia123");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #c53030, #e53e3e)" }}>
      <div className="card" style={{ width: "100%", maxWidth: "420px" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ color: "#c53030", fontSize: "2rem" }}>CardioIA</h1>
          <p style={{ color: "#718096", marginTop: "0.5rem" }}>Portal de Diagnostico em Cardiologia</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="medico@cardioia.com" required />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="cardioia123" required />
          </div>
          {erro && <div className="alert-error">{erro}</div>}
          <button type="submit" className="btn-primary">Entrar no Portal</button>
        </form>
      </div>
    </div>
  );
}

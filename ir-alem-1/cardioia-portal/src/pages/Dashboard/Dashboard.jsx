import { useState, useEffect } from "react";
import { getPacientes } from "../../services/pacientesService";

export default function Dashboard() {
  const [pacientes, setPacientes] = useState([]);
  const [consultas, setConsultas] = useState(() => JSON.parse(localStorage.getItem("cardioia_consultas") || "[]"));

  useEffect(() => { getPacientes().then(setPacientes); }, []);

  const altoRisco = pacientes.filter(p => p.risco === "alto").length;
  const medioRisco = pacientes.filter(p => p.risco === "medio").length;
  const baixoRisco = pacientes.filter(p => p.risco === "baixo").length;

  return (
    <div className="container">
      <h2 style={{ marginBottom: "1.5rem", color: "#2d3748" }}>Dashboard</h2>
      <div className="dashboard-grid">
        <div className="metric-card"><h3>{pacientes.length}</h3><p>Total de Pacientes</p></div>
        <div className="metric-card"><h3>{consultas.length}</h3><p>Consultas Agendadas</p></div>
        <div className="metric-card"><h3 style={{ color: "#c53030" }}>{altoRisco}</h3><p>Alto Risco</p></div>
        <div className="metric-card"><h3 style={{ color: "#d69e2e" }}>{medioRisco}</h3><p>Medio Risco</p></div>
        <div className="metric-card"><h3 style={{ color: "#38a169" }}>{baixoRisco}</h3><p>Baixo Risco</p></div>
      </div>
      <div className="card">
        <h3 style={{ marginBottom: "1rem", color: "#c53030" }}>Ultimas Consultas</h3>
        {consultas.length === 0 ? <p style={{ color: "#718096" }}>Nenhuma consulta agendada ainda.</p> : (
          <table className="tabela">
            <thead><tr><th>Paciente</th><th>Data</th><th>Tipo</th></tr></thead>
            <tbody>{consultas.slice(-5).map((c, i) => <tr key={i}><td>{c.paciente}</td><td>{c.data}</td><td>{c.tipo}</td></tr>)}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}

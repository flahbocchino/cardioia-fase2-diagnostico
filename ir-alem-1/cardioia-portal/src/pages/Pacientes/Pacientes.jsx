import { useState, useEffect } from "react";
import { getPacientes } from "../../services/pacientesService";

export default function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    getPacientes().then((dados) => {
      setPacientes(dados);
      setCarregando(false);
    });
  }, []);

  const pacientesFiltrados = pacientes.filter(p =>
    p.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    p.diagnostico.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="container">
      <h2 style={{ marginBottom: "1.5rem", color: "#2d3748" }}>Pacientes</h2>
      <div className="card">
        <div className="form-group">
          <input type="text" placeholder="Buscar por nome ou diagnostico..." value={filtro} onChange={(e) => setFiltro(e.target.value)} />
        </div>
        {carregando ? <p style={{ color: "#718096" }}>Carregando...</p> : (
          <table className="tabela">
            <thead><tr><th>Nome</th><th>Idade</th><th>Diagnostico</th><th>Risco</th><th>Ultima Consulta</th></tr></thead>
            <tbody>{pacientesFiltrados.map((p) => (
              <tr key={p.id}>
                <td>{p.nome}</td>
                <td>{p.idade} anos</td>
                <td>{p.diagnostico}</td>
                <td><span className={"badge-" + p.risco}>{p.risco}</span></td>
                <td>{p.ultimaConsulta}</td>
              </tr>
            ))}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}

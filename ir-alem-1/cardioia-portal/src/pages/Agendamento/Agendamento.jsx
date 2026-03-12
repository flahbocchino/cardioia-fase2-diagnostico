import { useState, useReducer } from "react";
import { pacientesData } from "../../services/pacientesService";

const initialState = { pacienteId: "", data: "", hora: "", tipo: "", observacoes: "" };

function agendamentoReducer(state, action) {
  switch (action.type) {
    case "SET_CAMPO": return { ...state, [action.campo]: action.valor };
    case "RESET": return initialState;
    default: return state;
  }
}

export default function Agendamento() {
  const [form, dispatch] = useReducer(agendamentoReducer, initialState);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  const handleChange = (campo, valor) => {
    dispatch({ type: "SET_CAMPO", campo, valor });
    setSucesso(false);
    setErro("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.pacienteId || !form.data || !form.hora || !form.tipo) {
      setErro("Preencha todos os campos obrigatorios.");
      return;
    }
    const paciente = pacientesData.find(p => p.id === parseInt(form.pacienteId));
    const novaConsulta = { paciente: paciente.nome, data: form.data, hora: form.hora, tipo: form.tipo, observacoes: form.observacoes };
    const consultasSalvas = JSON.parse(localStorage.getItem("cardioia_consultas") || "[]");
    consultasSalvas.push(novaConsulta);
    localStorage.setItem("cardioia_consultas", JSON.stringify(consultasSalvas));
    dispatch({ type: "RESET" });
    setSucesso(true);
  };

  return (
    <div className="container">
      <h2 style={{ marginBottom: "1.5rem", color: "#2d3748" }}>Agendar Consulta</h2>
      <div className="card" style={{ maxWidth: "600px" }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Paciente *</label>
            <select value={form.pacienteId} onChange={(e) => handleChange("pacienteId", e.target.value)}>
              <option value="">Selecione</option>
              {pacientesData.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Data *</label>
            <input type="date" value={form.data} onChange={(e) => handleChange("data", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Hora *</label>
            <input type="time" value={form.hora} onChange={(e) => handleChange("hora", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Tipo *</label>
            <select value={form.tipo} onChange={(e) => handleChange("tipo", e.target.value)}>
              <option value="">Selecione</option>
              <option>Consulta de Rotina</option>
              <option>Retorno</option>
              <option>Urgencia</option>
              <option>Exame</option>
            </select>
          </div>
          <div className="form-group">
            <label>Observacoes</label>
            <textarea rows="3" value={form.observacoes} onChange={(e) => handleChange("observacoes", e.target.value)} />
          </div>
          {erro && <div className="alert-error">{erro}</div>}
          {sucesso && <div className="alert-success">Consulta agendada com sucesso!</div>}
          <button type="submit" className="btn-primary">Agendar Consulta</button>
        </form>
      </div>
    </div>
  );
}

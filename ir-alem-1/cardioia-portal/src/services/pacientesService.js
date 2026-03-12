export const pacientesData = [
  { id: 1, nome: "Carlos Oliveira", idade: 58, diagnostico: "Angina Estavel", risco: "medio", ultimaConsulta: "2025-01-10" },
  { id: 2, nome: "Maria Santos", idade: 72, diagnostico: "Insuficiencia Cardiaca", risco: "alto", ultimaConsulta: "2025-01-15" },
  { id: 3, nome: "Joao Pereira", idade: 45, diagnostico: "Hipertensao", risco: "medio", ultimaConsulta: "2025-01-08" },
  { id: 4, nome: "Ana Costa", idade: 63, diagnostico: "Fibrilacao Atrial", risco: "alto", ultimaConsulta: "2025-01-20" },
  { id: 5, nome: "Pedro Lima", idade: 51, diagnostico: "Extrassistole", risco: "baixo", ultimaConsulta: "2025-01-05" },
  { id: 6, nome: "Lucia Ferreira", idade: 67, diagnostico: "Angina Instavel", risco: "alto", ultimaConsulta: "2025-01-18" },
  { id: 7, nome: "Roberto Souza", idade: 55, diagnostico: "Bradicardia", risco: "medio", ultimaConsulta: "2025-01-12" },
  { id: 8, nome: "Fernanda Alves", idade: 48, diagnostico: "Taquicardia", risco: "medio", ultimaConsulta: "2025-01-14" },
];

export const getPacientes = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(pacientesData), 500);
  });
};

export const getPacienteById = (id) => {
  return new Promise((resolve) => {
    const paciente = pacientesData.find(p => p.id === id);
    setTimeout(() => resolve(paciente), 300);
  });
};

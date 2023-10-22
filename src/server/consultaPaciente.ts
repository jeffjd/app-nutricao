export async function getConsultaPaciente(pacienteId: string) {
    const response = await fetch(
      `http://localhost:3000/api/historicoConsulta?pacienteId=${pacienteId}`,
    );
  
    const data = await response.json();
  
    return data;
  }
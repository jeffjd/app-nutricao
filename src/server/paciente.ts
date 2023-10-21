export async function getPacienteByNutricionistaId(
    pacienteId: string,
    nutricionistaId: string,
  ) {
    const response = await fetch(`http://localhost:3000/api/verificarPaciente`, {
      method: 'POST',
      body: JSON.stringify({ pacienteId, nutricionistaId }),
    });
  
    const data = await response.json();
  
    return data;
  }
import { NextResponse, NextRequest } from 'next/server';

import prisma from '../../../lib/prisma';

export async function GET(request: NextRequest) {
  const nutricionistaId = request.nextUrl.searchParams.get('nutricionistaId');

  try {
    const pacientes = await prisma.paciente.findMany();

    const filterPacienteSemNutricionista = pacientes.filter(
      (item) => item.nutricionistaId === null,
    );

    const filterPacienteComNutricionista = pacientes.filter(
      (item) => item.nutricionistaId === nutricionistaId,
    );

    const responseJson = [
      [...filterPacienteSemNutricionista],
      [...filterPacienteComNutricionista],
    ];

    return NextResponse.json({ ...responseJson });
  } catch (error) {
    return NextResponse.json({ message: `Ocorreu um erro durante o login.` });
  }
}
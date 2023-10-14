import { NextResponse } from 'next/server';

import prisma from '../../../lib/prisma';

export async function POST(request: Request) {
  const { pacienteId, nutricionistaId } = await request.json();

  try {
    const vincularPaciente = await prisma.paciente.update({
      where: { id: pacienteId },
      data: { nutricionistaId },
    });

    return NextResponse.json({
      ok: true,
      msg: `Paciente ${vincularPaciente.nome} vinculado com sucesso a sua conta`,
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      msg: `Ocorreu um erro ao vincular paciente.`,
    });
  }
}
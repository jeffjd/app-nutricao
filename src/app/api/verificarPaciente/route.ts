import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(request: Request) {
  const { pacienteId, nutricionistaId } = await request.json();

  try {
    const paciente = await prisma.paciente.findFirst({
      where: { id: pacienteId, nutricionistaId: nutricionistaId },
    });

    return NextResponse.json({ paciente });
  } catch (error) {
    return NextResponse.json({ message: `Ocorreu um erro durante o login.` });
  }
}
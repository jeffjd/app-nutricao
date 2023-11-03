import { NextResponse, NextRequest } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET(request: NextRequest) {
  const pacienteId = request.nextUrl.searchParams.get('pacienteId');

  try {
    const consultas = await prisma.consulta.findMany({
      where: { pacienteId },
    });

    if (consultas) {
      let totalPontos = 0;
      for (let i = 0; consultas.length > i; i++) {
        totalPontos += consultas[i].points;
      }

      return NextResponse.json({ points: totalPontos });
    }
  } catch (error) {
    return NextResponse.json({ message: `Ocorreu um erro durante o login.` });
  }
}
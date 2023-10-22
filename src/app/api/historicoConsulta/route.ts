import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const pacienteId = request.nextUrl.searchParams.get('pacienteId');

  try {
    const consultas = await prisma.consulta.findMany({
      where: { pacienteId },
      include: {
        receitaConsulta: {
          include: {
            receita: {
              include: { ingredientes: { include: { ingrediente: true } } },
            },
          },
        },
      },
    });

    return NextResponse.json([...consultas]);
  } catch (error) {
    return NextResponse.json({ message: `Ocorreu um erro durante o login.` });
  }
}
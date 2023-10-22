import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET(request: NextRequest) {
  const pacienteId = request.nextUrl.searchParams.get('pacienteId');
  const status = request.nextUrl.searchParams.get('status');

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

    const consultaAberta = consultas.filter((item) => item.status === true);

    return NextResponse.json(
      consultaAberta.length > 0 ? [...consultaAberta] : null,
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: `Ocorreu um erro.` });
  }
}
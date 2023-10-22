import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { format } from 'date-fns-tz';

export async function POST(request: Request) {
  const { select } = await request.json();

  const dataHoraBrasil = new Date();
  dataHoraBrasil.setUTCHours(dataHoraBrasil.getUTCHours() - 3);

  const dataHoraString = format(dataHoraBrasil, `yyyy-MM-dd'T'HH:mm:ssXXX`, {
    timeZone: 'America/Sao_Paulo',
  });

  const arrayConsumo = [];
  for (let i = 0; select.length > i; i++) {
    arrayConsumo.push({
      receitaConsultaId: select[i].id,
      createdAt: dataHoraString,
    });
  }

  try {
    await prisma.receitaConsumida.createMany({
      data: arrayConsumo,
    });

    return NextResponse.json({
      ok: true,
      msg: 'Consumo registrado',
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: `Ocorreu um erro durante a criação da consulta.`,
    });
  }
}

export async function GET(request: NextRequest) {
  const consultaId = request.nextUrl.searchParams.get('consultaId');

  try {
    if (consultaId) {
      const receitaConsulta = await prisma.receitaConsulta.findFirst({
        where: { consultaId },
        include: { receitaConsumida: true },
      });

      return NextResponse.json([...(receitaConsulta?.receitaConsumida || [])]);
    }
    return NextResponse.json({ ok: false, msg: `Ocorreu um erro.1` });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ ok: false, msg: `Ocorreu um erro.2` });
  }
}
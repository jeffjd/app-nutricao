import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { format } from 'date-fns-tz';

export async function POST(request: Request) {
  const { select, dateNow } = await request.json();

  const arrayConsumo = [];
  for (let i = 0; select.length > i; i++) {
    arrayConsumo.push({
      receitaConsultaId: select[i].id,
      createdAt: dateNow,
    });
  }

  try {
    await prisma.receitaConsumida.createMany({
      data: arrayConsumo,
    });

    return NextResponse.json({
      ok: true,
      msg: 'Consumo de hoje degistrado registrado',
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
      const receitaConsulta = await prisma.receitaConsulta.findMany({
        where: { consultaId },
        include: { receitaConsumida: true },
      });

      let newArray = [];
      for (let i = 0; receitaConsulta.length > i; i++) {
        newArray.push(...receitaConsulta[i].receitaConsumida);
      }

      return NextResponse.json(newArray);
    }
    return NextResponse.json({ ok: false, msg: `Ocorreu um erro.1` });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ ok: false, msg: `Ocorreu um erro.2` });
  }
}
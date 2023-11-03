import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { format } from 'date-fns-tz';

export async function POST(request: Request) {
  const { pesoInicial, pesoObjetivo, retorno, pacienteId, receitas } =
    await request.json();

  const dataHoraBrasil = new Date();
  dataHoraBrasil.setUTCHours(dataHoraBrasil.getUTCHours() - 3);

  const dataHoraString = format(dataHoraBrasil, `yyyy-MM-dd'T'HH:mm:ssXXX`, {
    timeZone: 'America/Sao_Paulo',
  });

  try {
    const consulta = await prisma.consulta.create({
      data: {
        pesoInicial: parseFloat(pesoInicial),
        pesoObjetivo: parseFloat(pesoObjetivo),
        retorno: retorno.value,
        pacienteId,
        createdAt: dataHoraString,
        updatedAt: dataHoraString,
      },
    });

    const arrayReceita = [];
    for (let i = 0; receitas.length > i; i++) {
      arrayReceita.push({ receitaId: receitas[i].id, consultaId: consulta.id });
    }
    if (arrayReceita.length > 0) {
      await prisma.receitaConsulta.createMany({
        data: arrayReceita,
      });
    } else {
      return NextResponse.json({
        ok: false,
        msg: 'Erro ao criar a consulta',
      });
    }
    return NextResponse.json({
      ok: true,
      msg: 'Consulta criada com sucesso!',
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: `Ocorreu um erro durante a criação da consulta.`,
    });
  }
}

export async function PUT(request: Request) {
  const { pesoFinal, altura, imc, points, consultaId } = await request.json();

  try {
    await prisma.consulta.update({
      where: { id: consultaId },
      data: {
        pesoFinal,
        altura,
        imc,
        points,
        status: false,
      },
    });

    return NextResponse.json({
      ok: true,
      msg: 'Consulta finalizada com sucesso!',
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: `Ocorreu um erro.`,
    });
  }
}


export async function GET(request: NextRequest) {
  const close = request.nextUrl.searchParams.get('close');
  const consultaId = request.nextUrl.searchParams.get('consultaId');

  try {
    if (close && consultaId) {
      await prisma.consulta.update({
        where: { id: consultaId },
        data: { status: false },
      });

      return NextResponse.json({
        ok: true,
        msg: 'Seu acompanhamento foi encerrado, favor retornar ao consultorio!',
      });
    }
    return NextResponse.json({ ok: false, msg: `Ocorreu um erro.1` });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ ok: false, msg: `Ocorreu um erro.2` });
  }
}
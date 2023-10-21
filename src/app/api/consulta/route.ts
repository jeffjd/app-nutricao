import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { format } from 'date-fns-tz';

export async function POST(request: Request) {
  const { peso, altura, imc, pacienteId } = await request.json();

  const dataHoraBrasil = new Date();
  dataHoraBrasil.setUTCHours(dataHoraBrasil.getUTCHours() - 3);

  const dataHoraString = format(dataHoraBrasil, `yyyy-MM-dd'T'HH:mm:ssXXX`, {
    timeZone: 'America/Sao_Paulo',
  });

  try {
    await prisma.consulta.create({
      data: {
        altura,
        imc,
        peso,
        pacienteId,
        createdAt: dataHoraString,
        updatedAt: dataHoraString,
      },
    });

    return NextResponse.json({ ok: true, msg: 'Consulta criada com sucesso!' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: `Ocorreu um erro durante a criação da consulta.`,
    });
  }
}
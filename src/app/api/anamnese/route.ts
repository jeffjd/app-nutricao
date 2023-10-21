import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { format } from 'date-fns-tz';

export async function POST(request: Request) {
  const { peso, altura, imc, meta, pacienteId } = await request.json();

  const dataHoraBrasil = new Date();
  dataHoraBrasil.setUTCHours(dataHoraBrasil.getUTCHours() - 3);

  // Formata a data e hora no formato ISO-8601 com o fuso horário do Brasil (UTC-3)
  const dataHoraString = format(dataHoraBrasil, `yyyy-MM-dd'T'HH:mm:ssXXX`, {
    timeZone: 'America/Sao_Paulo',
  });

  try {
    await prisma.anamnese.create({
      data: {
        altura,
        imc,
        peso,
        meta,
        pacienteId,
        updatedAt: dataHoraString,
      },
    });

    return NextResponse.json({ ok: true, msg: 'Anamnese criada com sucesso!' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: `Ocorreu um erro durante a criação da anamnese.`,
    });
  }
}

export async function GET(request: NextRequest) {
  const pacienteId = request.nextUrl.searchParams.get('pacienteId');

  try {
    if (pacienteId) {
      const paciente = await prisma.paciente.findFirst({
        where: { id: pacienteId },
      });
      if (paciente) {
        const anamnese = await prisma.anamnese.findFirst({
          where: { pacienteId: paciente.id },
        });

        return NextResponse.json({ ...anamnese });
      }
      return NextResponse.json({ ok: false, msg: `Paciente não encontrado` });
    }

    return NextResponse.json({ ok: false, msg: `Paciente inválido` });
  } catch (error) {
    return NextResponse.json({ message: `Ocorreu um erro durante o login.` });
  }
}
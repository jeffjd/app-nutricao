import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function POST(request: Request) {
  const { email, senha, nome, nutricionistaId } = await request.json();

  await prisma.paciente.create({
    data: {
      email,
      senha,
      nome,
      nutricionistaId,
    },
  });

  return NextResponse.json({
    ok: true,
    msg: `Paciente cadastrado com sucesso!`,
  });
}

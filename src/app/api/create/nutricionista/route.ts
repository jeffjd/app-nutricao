import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function POST(request: Request) {
  const { email, senha, nome } = await request.json();

  await prisma.nutricionista.create({
    data: {
      email,
      senha,
      nome,
    },
  });

  return NextResponse.json({
    message: `Nutricionista cadastro realizado com sucesso!`,
  });
}

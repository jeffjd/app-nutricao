import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(request: Request) {
  const { email, senha, nome, tipodecadastro } = await request.json();
  if (tipodecadastro === 'paciente') {
    await prisma.paciente.create({
      data: {
        email,
        senha,
        nome,
      },
    });
  } else {
    await prisma.nutricionista.create({
      data: {
        email,
        senha,
        nome,
      },
    });
  }

  return NextResponse.json({ message: `cadastro do ${tipodecadastro} realizado com sucesso` });
}

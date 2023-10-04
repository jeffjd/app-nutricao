import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function POST(request: Request) {
  const { email, senha } = await request.json();
  try {
    const user = await prisma.paciente.findFirst({
      where: {
        email,
      },
    });
    if (user) {
      return NextResponse.json({ user });
    }

    return NextResponse.json({ ok: false, message: `Usuário não encontrado.` });
  } catch (error) {
    return NextResponse.json({ message: `Ocorreu um erro durante o login.` });
  }
}
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET(request: Request) {
  const { email, senha, tipodecadastro } = await request.json();
  if (tipodecadastro === 'paciente') {
    const user = await prisma.paciente.findFirst({
      where: {
        email,
      },
    });
    if (user) {
      return NextResponse.json({ message: `Temos o paciente!` });
    }
  } else {
    const user = await prisma.nutricionista.findFirst({
      where: {
        email,
      },
    });
    if (user) {
      return NextResponse.json({ message: `Temos o nutricionista!` });
    }
  }
}

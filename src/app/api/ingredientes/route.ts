import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
  try {
    const ingredientes = await prisma.ingrediente.findMany();
    if (ingredientes) {
      return NextResponse.json({ ok: true, data: ingredientes });
    }

    return NextResponse.json({ message: `Usuário não encontrado.` });
  } catch (error) {
    return NextResponse.json({ message: `Ocorreu um erro durante o login.` });
  }
}

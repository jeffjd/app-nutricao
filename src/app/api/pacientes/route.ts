import { NextResponse, NextRequest } from 'next/server';

import prisma from '../../../lib/prisma';

export async function GET(request: NextRequest) {
  const nutricionistaId = request.nextUrl.searchParams.get('nutricionistaId');

  try {
    const pacientes = await prisma.paciente.findMany({
      where: { nutricionistaId },
    });

    return NextResponse.json([...pacientes]);
  } catch (error) {
    return NextResponse.json({ message: `Ocorreu um erro durante o login.` });
  }
}

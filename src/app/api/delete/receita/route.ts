import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('receitaId');
  if (id) {
    await prisma.receita.update({
      where: { id },
      data: {
        status: false,
      },
    });

    return NextResponse.json({
      ok: true,
      msg: `Receição excluida com sucesso!`,
    });
  }
  return NextResponse.json({
    ok: false,
    msg: `Parâmetro receita inválido!`,
  });
}
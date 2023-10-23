import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(request: Request) {
  const { nome, ingredientes, nutricionistaId } = await request.json();
  try {
    const receita = await prisma.receita.create({
      data: {
        nome,
      },
    });

    const newArray = [];
    for (let i = 0; ingredientes.length > i; i++) {
      const { nome, calorias, unidade, ...rest } = ingredientes[i];
      newArray.push({ ...rest, receitaId: receita.id });
    }

    const ingredientesQuantidade =
      await prisma.ingredienteQuantidade.createMany({
        data: newArray,
      });

      return NextResponse.json({
        ok: true,
        msg: `Receita ${receita.nome} cadastrada com sucesso!`,
      });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      msg: 'Erro ao cadastrar a receita, tente novamente em breve.',
    });
  }
}

export async function GET(request: NextRequest) {
  try {
    const nutricionistaId = request.nextUrl.searchParams.get('nutricionistaId');
    const receitas = await prisma.receita.findMany({
      where: { nutricionistaId },
      include: {
        ingredientes: {
          include: {
            ingrediente: true,
          },
        },
      },
    });

    return NextResponse.json(receitas);
  } catch (error) {
    return NextResponse.json({
      ok: false,
      msg: 'Erro ao buscar as receitas, tente novamente em breve.',
    });
  }
}

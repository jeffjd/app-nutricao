import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(request: Request) {
  const { nome, ingredientes } = await request.json();
  try {
    const receita = await prisma.receita.create({
      data: {
        nome,
      },
    });

    const newArray = [];
    for (let i = 0; ingredientes.length > i; i++) {
      newArray.push({ ...ingredientes[i], receitaId: receita.id });
    }

    const ingredientesQuantidade =
      await prisma.ingredienteQuantidade.createMany({
        data: newArray,
      });

    return NextResponse.json({ receita, ingredientesQuantidade });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

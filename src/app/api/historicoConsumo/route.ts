import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

function cleanArray(array: any[]) {
  return array.filter(
    (obj, index, self) =>
      index ===
      self.findIndex((t) => t.dias === obj.dias && t.dias === obj.dias),
  );
}

export async function GET(request: NextRequest) {
  const consultaId = request.nextUrl.searchParams.get('consultaId');

  try {
    if (consultaId) {
      const receitasConsumidas = await prisma.receitaConsulta.findMany({
        where: { consultaId },
        include: {
          receitaConsumida: {
            include: {
              receitaConsulta: {
                include: {
                  receita: {
                    include: {
                      ingredientes: { include: { ingrediente: true } },
                    },
                  },
                },
              },
            },
          },
        },
      });

      let diasConsumidos: any[] = [];
      for (let i = 0; receitasConsumidas.length > i; i++) {
        for (
          let j = 0;
          receitasConsumidas[i].receitaConsumida.length > j;
          j++
        ) {
          diasConsumidos.push({
            dias: receitasConsumidas[i].receitaConsumida[j].createdAt,
          });
        }
      }

      diasConsumidos = cleanArray(diasConsumidos);

      // for (let i = 0; receitasConsumidas.length > i; i++) {
      //   for (
      //     let j = 0;
      //     receitasConsumidas[i].receitaConsumida.length > j;
      //     j++
      //   ) {
      //     if (
      //       diasConsumidos.some(
      //         (item) =>
      //           receitasConsumidas[i].receitaConsumida[j].createdAt ===
      //           item.dias,
      //       )
      //     ) {
      //       if (
      //         receitasConsumidas[i].receitaConsumida[j].receitaConsulta?.receita
      //       ) {
      //         if (
      //           receitasConsumidas[i].receitaConsumida[j].receitaConsulta
      //             ?.receita?.ingredientes
      //         ) {
      //           for (
      //             let r = 0;
      //             (receitasConsumidas[i].receitaConsumida[j].receitaConsulta
      //               ?.receita?.ingredientes.length as number) > r;
      //             r++
      //           )
      //             // {
      //             //   diasConsumidos.push({ cal += receitasConsumidas[i].receitaConsumida[j]
      //             //     .receitaConsulta?.receita?.ingredientes[r].ingrediente
      //             //     ?.calorias as number})
      //             // }
      //             return;
      //         }
      //       }
      //     }
      //   }
      // }

      return NextResponse.json({ diasConsumidos, receitasConsumidas });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: `Ocorreu um erro.` });
  }
}
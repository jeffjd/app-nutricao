'use client';

import { Input } from '@/components';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import fetcher from '../../lib/fetch';
import Spinner from '../../components/Spinner';

interface IIngrediente {
  calorias: number;
  id: string;
  nome: string;
  unidade: string;
}

interface IIngredienteQuantidade {
  id: string;
  receitaId: string;
  ingredienteId: string;
  quantidade: number;
  ingrediente: IIngrediente;
}

interface IReceita {
  id: string;
  nome: string;
  ingredientes: IIngredienteQuantidade[];
}

interface IRecipeShowcase {
  nutricionistaId: string;
}

const RecipeShowcase: React.FC<IRecipeShowcase> = ({nutricionistaId}) => {
  const { data, isLoading } = useSWR<IReceita[]>(`/api/receita?nutricionistaId=${nutricionistaId}`, fetcher);

  return (
    <>
      {isLoading ? <Spinner /> : null}
      <div className="mb-10">
        {data && data.length > 0 ? (
          <>
            <div className="w-1/2 mx-auto my-10">
              <Input label="" placeholder="Buscar..." />
            </div>

            <div className="flex flex-wrap gap-5 justify-center mt-4">
              {data.map((itemReceita, indexReceita) => (
                <div
                  key={indexReceita}
                  className="w-1/5 border rounded-lg drop-shadow-md p-4 cursor-pointer"
                >
                  <h4 className="font-semibold text-lg border-b border-gray-100">
                    {itemReceita.nome}
                  </h4>
                  <div className="mt-3">
                    {itemReceita.ingredientes.map(
                      (
                        itemIngredienteQuantidade,
                        indexIngredienteQuantidade,
                      ) => (
                        <div
                          key={indexIngredienteQuantidade}
                          className="border rounded p-2 mb-2"
                        >
                          <div className="flex flex-col gap-1 text-sm">
                            <p>
                              <strong className="pr-1">Ingrediente:</strong>
                              {itemIngredienteQuantidade.ingrediente.nome}
                            </p>
                            <p>
                              <strong className="pr-1">Quantidade:</strong>
                              {itemIngredienteQuantidade.quantidade}
                            </p>
                            <p>
                              <strong className="pr-1">Calorias:</strong>
                              {itemIngredienteQuantidade.ingrediente.calorias *
                                itemIngredienteQuantidade.quantidade}
                            </p>
                            <p>
                              <strong className="pr-1">Unidade:</strong>
                              {itemIngredienteQuantidade.ingrediente.unidade}
                            </p>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div>
            <h5 className="font-semibold text-xl text-center mt-10 border rounded-md p-4 w-fit mx-auto px-4">
              Nenhuma receita encontrada.
            </h5>
          </div>
        )}
      </div>
    </>
  );
};

export default RecipeShowcase;
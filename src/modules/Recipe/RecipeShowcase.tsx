'use client';

import { Button, Input, Modal } from '@/components';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import fetcher from '../../lib/fetch';
import Spinner from '../../components/Spinner';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';

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

const RecipeShowcase: React.FC<IRecipeShowcase> = ({ nutricionistaId }) => {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [receitaSelecionada, setReceitaSelecionada] = useState<IReceita | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { data, isLoading, mutate } = useSWR<IReceita[]>(
    `/api/receita?nutricionistaId=${nutricionistaId}`,
    fetcher,
  );

  const handleOpenDeleteModal = (): void => {
    setOpenDelete(!openDelete);
  };

  const handleDeleteReceita = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/delete/receita?receitaId=${receitaSelecionada?.id}`);
      const { ok, msg } = await response.json();
      if (ok) {
        toast.success(msg);
        setReceitaSelecionada(null);
        handleOpenDeleteModal();
        mutate();
      } else{
        toast.info(msg);
      }
    } catch (error) {
      toast.warning('Falha no login');
    } finally {
      setLoading(false);
    }

  }

  const handleOpenEditModal = (): void => {
    setOpenEdit(!openEdit);
  };

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
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      model="outline"
                      className="!w-fit text-xs h-8 px-2 py-0 pt-1"
                      //onClick={handleOpenModal}
                    >
                      <AiFillEdit size={18} className="text-black" />
                    </Button>
                    <Button
                      type="button"
                      model="outline"
                      className="!w-fit text-xs h-8 px-2 py-0 pt-1"
                      onClick={() => (
                        setReceitaSelecionada(itemReceita),
                        handleOpenDeleteModal()
                      )}
                    >
                      <AiFillDelete size={18} className="text-black" />
                    </Button>
                  </div>
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
            <Modal
              title="Excluir Receita"
              isOpen={openDelete}
              onClose={handleOpenDeleteModal}
            >
              <div>
                <p>Tem certeza que quer excluir a receita?</p>
                <p>
                  <strong className="mr-1">
                    Essa ação não poderá ser desfeita.
                  </strong>
                </p>
              </div>
              <div>
                <div className="flex justify-evenly pt-4">
                  <div className="">
                    <Button
                      type="button"
                      model="outline"
                      onClick={handleDeleteReceita}
                    >
                      Confirmar
                    </Button>
                  </div>
                  <div>
                    <Button
                      type="button"
                      model="outline"
                      onClick={handleOpenDeleteModal}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </div>
            </Modal>
            <Modal
              title="Editar Refeições"
              isOpen={openEdit}
              onClose={handleOpenEditModal}
            >
              Editar Receita
            </Modal>
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
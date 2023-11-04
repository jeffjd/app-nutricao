'use client';

import { Button, Input, Modal } from '@/components';
import { useEffect, useState, useMemo } from 'react';
import useSWR from 'swr';
import fetcher from '../../lib/fetch';
import Spinner from '../../components/Spinner';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { GrFormView, GrFormClose } from 'react-icons/gr';
import { toast } from 'react-toastify';
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
import { formatData } from '@/util/formatDate';

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
  const [openView, setOpenView] = useState<boolean>(false);
  const [receitaSelecionada, setReceitaSelecionada] = useState<IReceita | null>(
    null,
  );
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
      const response = await fetch(
        `/api/delete/receita?receitaId=${receitaSelecionada?.id}`,
      );
      const { ok, msg } = await response.json();
      if (ok) {
        toast.success(msg);
        setReceitaSelecionada(null);
        handleOpenDeleteModal();
        mutate();
      } else {
        toast.info(msg);
      }
    } catch (error) {
      toast.warning('Falha no login');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEditModal = (): void => {
    setOpenEdit(!openEdit);
  };

  const handleOpenViewModal = (): void => {
    setOpenView(!openView);
  };

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'nome',
        header: 'Nome',
        size: 150,
      },
      {
        accessorKey: 'ingredientes',
        header: 'Ingredientes',
        size: 150,
        Cell: ({ cell }) => {
          return (
            <span>
              {cell.getValue<IIngredienteQuantidade[]>().map((ingrediente) => (
                <span key={ingrediente.id} className="p-1 m-1 border-2 rounded border-gray-300">
                  {ingrediente.ingrediente.nome}
                  {/* {ingrediente.ingrediente.nome} - {ingrediente.quantidade}{' '}
                  {ingrediente.ingrediente.unidade} */}
                </span>
              ))}
            </span>
          );
        },
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    enableTopToolbar: false,
    columns,
    data: data || [],
    localization: MRT_Localization_PT_BR,
    enableFilters: false,
    enableHiding: false,
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => {
      return (
        <span className="flex gap-2">
          <Button
            type="button"
            model="outline"
            className="!w-fit text-xs h-8 px-2 py-0 pt-1"
            onClick={() => (
              setReceitaSelecionada(row.original), handleOpenViewModal()
            )}
          >
            <GrFormView size={18} className="text-black" />
          </Button>
          <Button
            type="button"
            model="outline"
            className="!w-fit text-xs h-8 px-2 py-0 pt-1"
            onClick={() => (
              setReceitaSelecionada(row.original), handleOpenEditModal()
            )}
          >
            <AiFillEdit size={18} className="text-black" />
          </Button>
          <Button
            type="button"
            model="outline"
            className="!w-fit text-xs h-8 px-2 py-0 pt-1"
            onClick={() => (
              setReceitaSelecionada(row.original), handleOpenDeleteModal()
            )}
          >
            <AiFillDelete size={18} className="text-black" />
          </Button>
        </span>
      );
    },
  });

  return (
    <>
      {isLoading ? <Spinner /> : null}
      <div className="mb-10">
        {data && data.length > 0 ? (
          <>
            <Modal
              title="Excluir Refeição"
              isOpen={openDelete}
              onClose={handleOpenDeleteModal}
            >
              <div>
                <p>Tem certeza que quer excluir a refeição?</p>
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
              Editar Refeição
            </Modal>
            <Modal
              title="Visualizar Refeição"
              isOpen={openView}
              onClose={() => (
                handleOpenViewModal(), setReceitaSelecionada(null)
              )}
            >
              <h4 className="font-semibold text-lg border-b border-gray-100">
                {receitaSelecionada?.nome}
              </h4>
              <div className="mt-3">
                {receitaSelecionada?.ingredientes.map(
                  (itemIngredienteQuantidade, indexIngredienteQuantidade) => (
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
            </Modal>
            {data && data?.length > 0 ? (
              <div className="max-w-6xl m-auto">
                <MaterialReactTable table={table} />
              </div>
            ) : (
              <div>
                <h5 className="font-semibold text-xl text-center mt-10 border rounded-md p-4 w-fit mx-auto px-4">
                  Você não possui nenhum pacientes.
                </h5>
              </div>
            )}
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
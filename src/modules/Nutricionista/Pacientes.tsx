'use client';

import { useMemo, useState } from 'react';
import Spinner from '@/components/Spinner';
import useSWR from 'swr';
import fetcher from '@/lib/fetch';
import { useRouter } from 'next/navigation';
import CadastrarPaciente from './CadastrarPaciente';
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
import { formatData } from '@/util/formatDate';
import { Button } from '@/components';

interface DashboardProps {
  auth: any;
}

interface IPaciente {
  email: string;
  id: string;
  nome: string;
  nutricionistaId: string;
  senha: string;
}

const Pacientes: React.FC<DashboardProps> = ({ auth }) => {
  const router = useRouter();
  const [nav, setNav] = useState<number>(0);

  const { data, isLoading, mutate } = useSWR<IPaciente[]>(
    `/api/pacientes?nutricionistaId=${auth.id}`,
    fetcher,
  );

  const handleAbrirDetalhePaciente = (id: string) => {
    router.push(`/nutricionista/consulta/${id}`);
  };

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'nome',
        header: 'Nome',
        size: 150,
      },
      {
        accessorKey: 'email',
        header: 'E-mail',
        size: 150,
      },
      {
        accessorKey: 'createdAt',
        header: 'Criado em',
        size: 200,
        Cell: ({ cell }) => <span>{formatData(cell.getValue<string>())}</span>,
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
        <Button
          type="button"
          onClick={() => handleAbrirDetalhePaciente(row.original.id)}
        >
          Consultas
        </Button>
      );
    },
  });

  const RenderMeusPacientes = () => {
    return (
      <>
        {data && data?.length > 0 ? (
          <MaterialReactTable table={table} />
        ) : (
          <div>
            <h5 className="font-semibold text-xl text-center mt-10 border rounded-md p-4 w-fit mx-auto px-4">
              Você não possui nenhum pacientes.
            </h5>
          </div>
        )}
      </>
    );
  };

  const Context: { [key: number]: React.ReactNode } = {
    0: <RenderMeusPacientes />,
    1: (
      <CadastrarPaciente
        nutricionistaId={auth.id}
        nextStep={setNav}
        refreshMeusPacientes={mutate}
      />
    ),
  };

  return (
    <>
      <section className="max-w-6xl m-auto">
        <nav className="w-full flex">
          <div
            className={`py-4 px-6 font-semibold text-center w-full ${
              nav == 0 ? 'bg-azulescuro' : 'bg-slate-200'
            }`}
            onClick={() => setNav(0)}
          >
            Pacientes
          </div>

          <div
            className={`py-4 px-6 font-semibold text-center w-full ${
              nav == 1 ? 'bg-azulescuro' : 'bg-slate-200'
            }`}
            onClick={() => setNav(1)}
          >
            Cadastrar Paciente
          </div>
        </nav>
        {isLoading ? <Spinner /> : Context[nav as number]}
      </section>
    </>
  );
};

export default Pacientes;
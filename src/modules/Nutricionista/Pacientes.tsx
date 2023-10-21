'use client';

import { useState } from 'react';
import { FaUser } from 'react-icons/fa6';
import Spinner from '@/components/Spinner';
import { Input } from '@/components';
import useSWR from 'swr';
import fetcher from '@/lib/fetch';
import { useRouter } from 'next/navigation';
import CadastrarPaciente from './CadastrarPaciente';

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
  const [nav, setNav] = useState<number>(1);

  const { data, isLoading, mutate } = useSWR<IPaciente[]>(
    `/api/pacientes?nutricionistaId=${auth.id}`,
    fetcher,
  );

  const handleAbrirDetalhePaciente = (paciente: IPaciente) => {
    router.push(`/nutricionista/consulta/${paciente.id}`);
  };

  const RenderMeusPacientes = () => {
    return (
      <>
        {data && data?.length > 0 ? (
          <>
            <div className="w-1/2 mx-auto my-10">
              <Input label="" placeholder="Buscar pacientes" />
            </div>
            <div className="flex flex-wrap gap-4 mt-4 px-4">
              {data?.map((item, index) => (
                <div
                  key={index}
                  className="border rounded p-4 flex flex-col justify-center items-center gap-2 cursor-pointer"
                  onClick={() => handleAbrirDetalhePaciente(item)}
                >
                  <div className="rounded-full h-14 w-14 bg-black/20 flex justify-center items-center">
                    <FaUser size={24} className="text-white" />
                  </div>
                  <div>{item.nome}</div>
                </div>
              ))}
            </div>
          </>
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
    0: (
      <CadastrarPaciente
        nutricionistaId={auth.id}
        nextStep={setNav}
        refreshMeusPacientes={mutate}
      />
    ),
    1: <RenderMeusPacientes />,
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
            Cadastrar Paciente
          </div>

          <div
            className={`py-4 px-6 font-semibold text-center w-full ${
              nav == 1 ? 'bg-azulescuro' : 'bg-slate-200'
            }`}
            onClick={() => setNav(1)}
          >
            Meus Pacientes
          </div>
        </nav>
        {isLoading ? <Spinner /> : Context[nav as number]}
      </section>
    </>
  );
};

export default Pacientes;
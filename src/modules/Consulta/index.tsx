'use client';

import { useState } from 'react';
import { FaAngleLeft, FaUser } from 'react-icons/fa6';
import CriarConsulta from './CriarConsulta';
import HistoricoConsulta from './HistoricoConsulta';
import Link from 'next/link';
import CriarAnamnese from './CriarAnamnese';
import useSWR from 'swr';
import fetcher from '@/lib/fetch';
import Spinner from '@/components/Spinner';
import { IAnamnese } from '@/helper/interface';
import EditarAnamnese from './EditarAnamnese';

interface DashboardProps {
  auth: any;
  paciente: any;
}

const Dashboard: React.FC<DashboardProps> = ({ auth, paciente }) => {
  const [nav, setNav] = useState<number>(0);

  const Context = () => {
    switch (nav) {
      case 0:
        return (
          <CriarConsulta
            paciente={paciente}
            nextStep={setNav}
            nutricionistaId={auth.id}
          />
        );
      case 1:
        return <HistoricoConsulta paciente={paciente} />;
    }
  };

  const { data, isLoading, mutate } = useSWR<IAnamnese>(
    `/api/anamnese?pacienteId=${paciente.id}`,
    fetcher,
  );

  return (
    <>
      <section>
        <div className="max-w-6xl m-auto bg-azulescuro">
          <div className="flex justify-between py-1">
            <div className="flex">
              <span className="flex align-middle text-2xl pl-10 pr-4">
                {auth.nome}
              </span>
              <div className="bg-gray-500 w-8 h-8 rounded-full flex justify-center items-center">
                <FaUser size={10} className="text-white" />
              </div>
            </div>
            <div className="pr-5">
              <Link
                href="/nutricionista"
                className="bg-gray-400 rounded-full w-8 h-8 flex justify-center items-center"
              >
                <FaAngleLeft size={22} />
              </Link>
            </div>
          </div>
        </div>
        <div className="max-w-6xl m-auto bg-verdeazulado p-5 flex justify-between items-start">
          <div>
            <h6 className="mb-3">
              <strong className="mr-1">Paciente:</strong>
              {paciente.nome}
            </h6>
            <p>
              <strong className="mr-1">Email:</strong>
              {paciente.email}
            </p>
          </div>
          {isLoading ? (
            <Spinner />
          ) : data && Object.keys(data).length !== 0 ? (
            <EditarAnamnese anamnese={data} />
          ) : (
            <CriarAnamnese pacienteId={paciente.id} refreshCache={mutate} />
          )}
        </div>
        <nav className="bg-verdeazulado max-w-6xl m-auto text-xl  flex cursor-pointer border-t border-azulescuro">
          <div
            className={`w-1/2 text-center py-2 align-middle ${
              nav === 0 ? 'bg-azulescuro' : ''
            }`}
            onClick={() => setNav(0)}
          >
            Criar consulta
          </div>
          <div
            className={`w-1/2 text-center py-2 align-middle ${
              nav === 1 ? 'bg-azulescuro' : ''
            }`}
            onClick={() => setNav(1)}
          >
            Histórico consultas
          </div>
        </nav>
        <Context />
      </section>
    </>
  );
};

export default Dashboard;
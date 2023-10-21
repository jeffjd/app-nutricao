'use client';

import { useState } from 'react';
import { FaAngleLeft, FaUser } from 'react-icons/fa6';
import CriarConsulta from './CriarConsulta';
import HistoricoConsulta from './HistoricoConsulta';
import Link from 'next/link';

interface DashboardProps {
  auth: any;
  paciente: any;
}

const Dashboard: React.FC<DashboardProps> = ({ auth, paciente }) => {
  const [nav, setNav] = useState<number>(0);

  const Context = () => {
    switch (nav) {
      case 0:
        return <CriarConsulta paciente={paciente} nextStep={setNav} />;
      case 1:
        return <HistoricoConsulta paciente={paciente} />;
    }
  };

  return (
    <section>
      <div className="max-w-6xl m-auto bg-azulescuro">
        <div className="flex justify-around py-12">
          <span className="flex justify-center gap-5 items-center text-3xl md:text-5xl">
            <Link
              href="/nutricionista"
              className="bg-gray-400 rounded-full h-10 w-10 flex justify-center items-center"
            >
              <FaAngleLeft size={22} />
            </Link>
            {auth.nome}
          </span>
          <div className="bg-gray-500 w-28 h-28 rounded-full md:w-36 md:h-36 flex justify-center items-center">
            <FaUser size={40} className="text-white" />
          </div>
        </div>
      </div>
      <div className="max-w-6xl m-auto bg-verdeazulado p-5">
        <h6 className="mb-3">
          <strong className="mr-1">Paciente:</strong>
          {paciente.nome}
        </h6>
        <p>
          <strong className="mr-1">Email:</strong>
          {paciente.email}
        </p>
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
  );
};

export default Dashboard;

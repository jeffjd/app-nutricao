'use client';

import { useState } from 'react';
import { FaUser } from 'react-icons/fa6';
import DashboardRecipe from '../Recipe/DashboardRecipe';
import Pacientes from './Pacientes';

interface DashboardProps {
  auth: any;
}

const Dashboard: React.FC<DashboardProps> = ({ auth }) => {
  const [nav, setNav] = useState<number>(0);

  const Context = () => {
    switch (nav) {
      case 0:
        return <Pacientes auth={auth} />;
      case 1:
        return <DashboardRecipe auth={auth} />;
      case 2:
        return <>cadastro...</>;
    }
  };

  return (
    <section>
      <div className="max-w-6xl m-auto bg-azulescuro">
        <div className="flex justify-start py-1">
          <span className="flex align-middle text-2xl pl-10 pr-4">
            {auth.nome}
          </span>
          <div className="bg-gray-500 w-8 h-8 rounded-full flex justify-center items-center">
            <FaUser size={10} className="text-white" />
          </div>
        </div>
      </div>

      <nav className="bg-verdeazulado max-w-6xl m-auto text-xl  flex cursor-pointer">
        <div
          className={`w-1/3 text-center py-2 align-middle ${
            nav === 0 ? 'bg-azulescuro' : ''
          }`}
          onClick={() => setNav(0)}
        >
          Meus pacientes
        </div>
        <div
          className={`w-1/3 text-center py-2 align-middle ${
            nav === 1 ? 'bg-azulescuro' : ''
          }`}
          onClick={() => setNav(1)}
        >
          Refeições Cadastradas
        </div>
        <div
          className={`w-1/3 text-center py-2 align-middle ${
            nav === 2 ? 'bg-azulescuro' : ''
          }`}
          onClick={() => setNav(2)}
        >
          Meu cadastro
        </div>
      </nav>
      <Context />
    </section>
  );
};

export default Dashboard;

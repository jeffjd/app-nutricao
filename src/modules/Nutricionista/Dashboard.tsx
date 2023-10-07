'use client';

import { useState } from 'react';
import { FaUser } from 'react-icons/fa6';

const Dashboard: React.FC = () => {
  const [nav, setNav] = useState<number>(0);

  const Context = () => {
    switch (nav) {
      case 0:
        return <>pacientes...</>;
      case 1:
        return <>receitas...</>;
      case 2:
        return <>cadastro...</>;
    }
  };

  return (
    <section>
      <div className="max-w-6xl m-auto bg-azulescuro">
        <div className="flex justify-around py-12">
          <span className="flex align-middle text-3xl md:text-5xl">
            Fulano de tal
          </span>
          <div className="bg-gray-500 w-28 h-28 rounded-full md:w-36 md:h-36 flex justify-center items-center">
            <FaUser size={40} className="text-white" />
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
          Minhas receitas
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
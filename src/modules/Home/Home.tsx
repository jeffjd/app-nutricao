'use client';

import { useState } from 'react';
import Login from '../login/login';

export type TType = 'paciente' | 'nutricionista';

const Home: React.FC = () => {
  const [type, setType] = useState<TType | null>(null);

  return (
    <div className="max-w-4xl m-auto rounded-md bg-azulclaro">
      <Login login={type} click={(val) => setType(val)} />
    </div>
  );
};

export default Home;

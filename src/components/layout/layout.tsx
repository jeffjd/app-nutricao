'use client';

import { ToastContainer } from 'react-toastify';
import { ProviderAuth } from '@/context/ProviderNutricao';

interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <>
      <ProviderAuth>
        {children}
        <ToastContainer />
      </ProviderAuth>
    </>
  );
};

export default Layout;

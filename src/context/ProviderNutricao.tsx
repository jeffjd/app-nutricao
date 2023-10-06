import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import Cookies from 'js-cookie';

type TType = 'paciente' | 'nutricionista';

interface IUser {
  id: string;
  email: string;
  nome: string;
  tipo: TType;
}

interface ApiState {
  data: IUser | null;
}

interface ApiAction {
  type: string;
  payload?: any;
}

interface ApiContextProps {
  state: ApiState;
  dispatch: React.Dispatch<ApiAction>;
}

const ApiContext = createContext<ApiContextProps | undefined>(undefined);

const ProviderAuth: React.FC<{ children: ReactNode }> = ({ children }) => {
  const storedData = Cookies.get('auth');
  const initialState = {
    data: storedData ? JSON.parse(storedData) : null,
  };

  const reducer = (state: ApiState, action: ApiAction): ApiState => {
    switch (action.type) {
      case 'add':
        Cookies.set('auth', JSON.stringify(action.payload));
        return { data: action.payload };
      case 'remove':
        return { data: null };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ApiContext.Provider value={{ state, dispatch }}>
      {children}
    </ApiContext.Provider>
  );
};

const useAuth = (): ApiContextProps => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi deve ser usado dentro de um ApiProvider');
  }
  return context;
};

export { ProviderAuth, useAuth };
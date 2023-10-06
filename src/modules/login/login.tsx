'use client';

import { useFormik } from 'formik';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { TType } from '../Home/Home';
import { useAuth } from '@/context/ProviderNutricao';
import { useRouter } from 'next/navigation';

interface ILogin {
  login: TType | null;
  click: (val: TType) => void;
}

const Login: React.FC<ILogin> = ({ login, click }) => {
  const router = useRouter();
  const { dispatch } = useAuth();

  const initialValues = {
    email: '',
    senha: '',
  };
  const { values, handleSubmit, handleChange } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const response = await fetch(`/api/login/${login}`, {
          method: 'POST',
          body: JSON.stringify({ ...values }),
        });
        const { ok, data } = await response.json();
        if (ok) {
          dispatch({ type: 'add', payload: { ...data, type: login } });
          router.push(`/${login}/perfil`);
        }
        toast.info(data.message)
      } catch (error) {
        toast.warning('Falha no login');
      }
    },
  });

  return (
    <div className="max-w-4xl m-auto rounded-md bg-azulclaro">
      <h1 className="text-center text-3xl bg-azulescuro mt-5 py-5">
        Login {login}
      </h1>
      <form className="flex flex-col gap-4 mt-5" onSubmit={handleSubmit}>
        <span className="text-center">Email</span>
        <input
          className="w-1/2 ml-auto mr-auto rounded-md"
          type="email"
          name="email"
          onChange={handleChange}
          value={values.email}
        />
        <span className="text-center mt-5">Senha</span>
        <input
          className="w-1/2 ml-auto mr-auto rounded-md"
          type="password"
          name="senha"
          onChange={handleChange}
          value={values.senha}
        />
        <div className="flex justify-center gap-4">
          <button
            type="button"
            className={`h-10 px-4 rounded-md font-bold border transition-all ${
              login === 'paciente' ? 'scale-100' : 'scale-75'
            }`}
            onClick={() => click('paciente')}
          >
            Paciente
          </button>
          <button
            type="button"
            className={`h-10 px-4 rounded-md font-bold border transition-all ${
              login === 'nutricionista' ? 'scale-100' : 'scale-75'
            }`}
            onClick={() => click('nutricionista')}
          >
            Nutricionista
          </button>
        </div>
        <div className="flex justify-center w-full">
          <button
            type="submit"
            className="p-3 px-10 mb-5 rounded-md"
            disabled={!login}
          >
            Enviar
          </button>
        </div>
      </form>
      <Link href="/cadastro/paciente">
        <span className="text-center py-3 block">
          Cadastre-se como Paciente
        </span>
      </Link>
      <span className="text-center block">ou</span>
      <Link href="/cadastro/nutricionista">
        <span className="text-center py-3 block">
          Cadastre-se como Nutricionista
        </span>
      </Link>
    </div>
  );
};

export default Login;

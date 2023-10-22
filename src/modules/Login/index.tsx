'use client';

import { useFormik } from 'formik';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/ProviderNutricao';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@/components';
import { useState } from 'react';

export type TType = 'paciente' | 'nutricionista';

const Login: React.FC = () => {
  const router = useRouter();
  const { dispatch } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<TType | null>(null);

  const initialValues = {
    email: '',
    senha: '',
  };
  const { values, handleSubmit, handleChange } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await fetch(`/api/login/${type}`, {
          method: 'POST',
          body: JSON.stringify(values),
        });
        const { ok, data } = await response.json();
        if (ok) {
          dispatch({ type: 'add', payload: { ...data, type: type } });
          router.push(`/${type}`);
        }
        toast.info(data.message);
      } catch (error) {
        toast.warning('Falha no login');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <section className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
        <div className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 flex justify-center gap-2">
          <h3>Login </h3>
          <p className="w-40 border-b-2 border-green text-left pl-2">{type}</p>
        </div>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            label="E-mail"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
          />
          <Input
            label="Senha"
            name="senha"
            type="password"
            value={values.senha}
            onChange={handleChange}
          />

          <div className="flex justify-center gap-4 my-4">
            <Button
              type="button"
              model="outline"
              className={` ${
                type === 'paciente'
                  ? 'scale-105 bg-green !text-white !border-green'
                  : 'scale-90'
              }`}
              onClick={() => setType('paciente')}
            >
              Paciente
            </Button>

            <Button
              type="button"
              model="outline"
              className={` ${
                type === 'nutricionista'
                  ? 'scale-105 bg-green !text-white !border-green'
                  : 'scale-90'
              }`}
              onClick={() => setType('nutricionista')}
            >
              Nutricionista
            </Button>
          </div>
          <div>
            <Button
              type="submit"
              disabled={!(values.email !== '' && values.senha !== '')}
            >
              Entrar
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
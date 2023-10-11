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

  const [type, setType] = useState<TType | null>(null);

  const initialValues = {
    email: '',
    senha: '',
  };
  const { values, handleSubmit, handleChange } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const response = await fetch(`/api/login/${type}`, {
          method: 'POST',
          body: JSON.stringify(values),
        });
        const { ok, data } = await response.json();
        if (ok) {
          dispatch({ type: 'add', payload: { ...data, type: type } });
          router.push(`/${type}/perfil`);
        }
        toast.info(data.message);
      } catch (error) {
        toast.warning('Falha no login');
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
            <Button type="submit" disabled={!type}>
              Entrar
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Já é cadastrado?
          <Link
            href="/"
            className="font-semibold leading-6 text-azulescurobotao hover:text-azulclarobotao ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
    // <div className="w-full h-full flex justify-center items-center">
    //   <div className="max-w-4xl m-auto bg-blue rounded-lg">
    //     <h1 className="text-center text-3xl bg-green text-white mt-5 py-5">
    //       Login {type}
    //     </h1>
    //     <form
    //       className="flex flex-col gap-4 mt-5 w-80 mx-auto"
    //       onSubmit={handleSubmit}
    //     >
    //       <Input
    //         label="E-mail"
    //         type="email"
    //         name="email"
    //         onChange={handleChange}
    //         value={values.email}
    //       />
    //       <Input
    //         label="Senha"
    //         type="password"
    //         name="senha"
    //         onChange={handleChange}
    //         value={values.senha}
    //       />

    //       <div className="flex justify-center gap-4">
    //         <button
    //           type="button"
    //           className={`h-10 px-4 rounded-md font-bold border transition-all ${
    //             type === 'paciente' ? 'scale-100' : 'scale-75'
    //           }`}
    //           onClick={() => setType('paciente')}
    //         >
    //           Paciente
    //         </button>
    //         <button
    //           type="button"
    //           className={`h-10 px-4 rounded-md font-bold border transition-all ${
    //             type === 'nutricionista' ? 'scale-100' : 'scale-75'
    //           }`}
    //           onClick={() => setType('nutricionista')}
    //         >
    //           Nutricionista
    //         </button>
    //       </div>
    //       <div className="flex justify-center w-full">
    //         <Button type="submit" disabled={!type}>
    //           Entrar
    //         </Button>
    //       </div>
    //     </form>
    //     <Link href="/cadastro/paciente">
    //       <span className="text-center py-3 block">
    //         Cadastre-se como Paciente
    //       </span>
    //     </Link>
    //     <span className="text-center block">ou</span>
    //     <Link href="/cadastro/nutricionista">
    //       <span className="text-center py-3 block">
    //         Cadastre-se como Nutricionista
    //       </span>
    //     </Link>
    //   </div>
    // </div>
  );
};

export default Login;

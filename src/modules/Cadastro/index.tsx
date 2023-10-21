'use client';

import { useFormik } from 'formik';
import Link from 'next/link';
import { FaAngleLeft } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { Input } from '@/components';

const Cadastro: React.FC = () => {
  const initialValues = {
    email: '',
    nome: '',
    senha: '',
  };
  const { values, handleSubmit, handleChange } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const response = await fetch(`/api/create/nutricionista`, {
          method: 'POST',
          body: JSON.stringify(values),
        });
        const data = await response.json();
        toast.success(data.message);
      } catch (error) {
        toast.warning('Falha no cadastro');
      }
    },
  });

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 relative">
          <Link href="/">
            <FaAngleLeft size={16} className="absolute left-5 top-2" />
          </Link>
          Cadastro nutricionista
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Nome"
            name="nome"
            type="text"
            value={values.nome}
            onChange={handleChange}
          />
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
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Cadastrar
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Já é cadastrado?
          <Link
            href="/"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Cadastro;

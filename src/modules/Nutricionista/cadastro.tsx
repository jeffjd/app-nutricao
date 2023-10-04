'use client';

import { useFormik } from 'formik';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { FaAngleLeft } from 'react-icons/fa6';

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
        const response = await fetch('/api/create/nutricionista', {
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
    <div className="max-w-4xl m-auto rounded-md bg-azulclaro">
      <h1 className="text-center text-3xl bg-azulescuro mt-5 py-5 relative">
        <Link href="/">
          <FaAngleLeft size={16} className="absolute left-5 top-7" />
        </Link>
        Cadastrar Nutricionista
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
        <span className="text-center mt-5">Nome</span>
        <input
          className="w-1/2 ml-auto mr-auto rounded-md"
          type="text"
          name="nome"
          onChange={handleChange}
          value={values.nome}
        />
        <span className="text-center mt-5">Senha</span>
        <input
          className="w-1/2 ml-auto mr-auto rounded-md"
          type="password"
          name="senha"
          onChange={handleChange}
          value={values.senha}
        />
        <div className="flex justify-center w-full">
          <button type="submit" className="p-3 px-10 mb-5 rounded-md">
            Enviar
          </button>
        </div>
      </form>
      <Link href="/">
        <span className="text-center py-5 block">
          Já tem cadastro? Faça seu login!
        </span>
      </Link>
    </div>
  );
};

export default Cadastro;

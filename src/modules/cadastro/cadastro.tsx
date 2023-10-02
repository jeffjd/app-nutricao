'use client';

import { useFormik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Cadastro: React.FC = () => {
  const [tipodepaciente, setTipodepaciente] = useState<string | null>(null);
  const initialValues = {
    email: '',
    nome: '',
    senha: '',
  };
  const { values, handleSubmit, handleChange } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        console.log(tipodepaciente);
        const response = await fetch('/api/user', {
          method: 'POST',
          body: JSON.stringify({ ...values, tipodepaciente }),
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
      <h1 className="text-center text-3xl bg-azulescuro mt-5 py-5">Cadastro</h1>
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
        <span className="text-center mt-5">Desejo me cadastrar como:</span>
        <div className="flex justify-center gap-4 mt-5">
          <button
            onClick={() => setTipodepaciente('paciente')}
            type="button"
            className={`
            p-3 px-10 rounded-md w-auto 
            ${tipodepaciente === 'paciente' ? 'bg-amarelo' : 'bg-cinza'}`}
          >
            Paciente
          </button>
          <button
            onClick={() => setTipodepaciente('nutricionista')}
            type="button"
            className={`
            p-3 px-10 rounded-md w-auto 
            ${tipodepaciente === 'nutricionista' ? 'bg-amarelo' : 'bg-cinza'}`}
          >
            Nutricionista
          </button>
        </div>
        <div className="flex justify-center w-full">
          <button
            type="submit"
            className={`p-3 px-10 mb-5 rounded-md ${!tipodepaciente ? 'bg-cinza' : 'bg-amarelo'}`}
            disabled={!tipodepaciente}
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Cadastro;

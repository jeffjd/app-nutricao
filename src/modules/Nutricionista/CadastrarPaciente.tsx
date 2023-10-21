'use client';

import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Input, Button } from '@/components';
import { Dispatch, SetStateAction, useState } from 'react';
import Spinner from '@/components/Spinner';

interface CadastrarPacienteProps {
  nutricionistaId: string;
  nextStep: Dispatch<SetStateAction<number>>;
  refreshMeusPacientes: () => void;
}

const CadastrarPaciente: React.FC<CadastrarPacienteProps> = ({
  nutricionistaId,
  refreshMeusPacientes,
  nextStep,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const initialValues = {
    email: '',
    nome: '',
    senha: '',
  };
  const { values, handleSubmit, handleChange } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await fetch(`/api/create/paciente`, {
          method: 'POST',
          body: JSON.stringify({ ...values, nutricionistaId }),
        });
        const { ok, msg } = await response.json();
        if (ok) {
          toast.success(msg);
          refreshMeusPacientes();
          nextStep(1);
        }
      } catch (error) {
        toast.warning('Falha no cadastro');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      {loading ? <Spinner /> : null}
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 relative">
            Cadastrar Paciente
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
              <Button type="submit">Cadastrar</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CadastrarPaciente;
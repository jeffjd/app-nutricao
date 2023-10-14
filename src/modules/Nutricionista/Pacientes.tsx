'use client';

import { useState } from 'react';
import { FaUser } from 'react-icons/fa6';
import Spinner from '@/components/Spinner';
import { Button, Input, Modal } from '@/components';
import { toast } from 'react-toastify';
import useSWR from 'swr';

interface DashboardProps {
  auth: any;
}

interface IPaciente {
  email: string;
  id: string;
  nome: string;
  nutricionistaId: string;
  senha: string;
}

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

const msgEmptyList: { [key: number]: string } = {
  0: 'Não existe pacientes novos.',
  1: 'Você não possui nenhum paciente vinculado.',
};

const Pacientes: React.FC<DashboardProps> = ({ auth }) => {
  const [nav, setNav] = useState<number>(0);
  const [open, setOpen] = useState<IPaciente | null>(null);

  const { data, isLoading, mutate } = useSWR<Array<IPaciente[]>>(
    `/api/pacientes?nutricionistaId=${auth.id}`,
    fetcher,
  );

  const handleVincularPaciente = async () => {
    try {
      const response = await fetch(`/api/paciente`, {
        method: 'POST',
        body: JSON.stringify({
          pacienteId: open?.id,
          nutricionistaId: auth.id,
        }),
      });
      const { ok, msg } = await response.json();
      if (ok) {
        toast.success(msg);
        mutate();
      } else toast.info(msg);
    } catch (error) {
      toast.warning('Falha ao vincular paciente1');
    } finally {
      setOpen(null);
    }
  };

  const handleAbrirDetalhePaciente = (paciente: IPaciente) => {
    console.log(paciente);
  };

  return (
    <>
      <section className="max-w-6xl m-auto">
        <nav className="w-full flex">
          <div
            className={`py-4 px-6 font-semibold text-center w-full ${
              nav == 0 ? 'bg-azulescuro' : 'bg-slate-200'
            }`}
            onClick={() => setNav(0)}
          >
            Pacientes
          </div>

          <div
            className={`py-4 px-6 font-semibold text-center w-full ${
              nav == 1 ? 'bg-azulescuro' : 'bg-slate-200'
            }`}
            onClick={() => setNav(1)}
          >
            Meus Pacientes
          </div>
        </nav>
        {isLoading ? (
          <Spinner />
        ) : data && data[nav]?.length > 0 ? (
          <>
            <div className="w-1/2 mx-auto my-10">
              <Input label="" placeholder="Buscar pacientes" />
            </div>
            <div className="flex flex-wrap gap-4 mt-4 px-4">
              {data[nav]?.map((item, index) => (
                <div
                  key={index}
                  className="border rounded p-4 flex flex-col justify-center items-center gap-2 cursor-pointer"
                  onClick={() =>
                    nav === 0 ? setOpen(item) : handleAbrirDetalhePaciente(item)
                  }
                >
                  <div className="rounded-full h-14 w-14 bg-black/20 flex justify-center items-center">
                    <FaUser size={24} className="text-white" />
                  </div>
                  <div>{item.nome}</div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div>
            <h5 className="font-semibold text-xl text-center mt-10 border rounded-md p-4 w-fit mx-auto px-4">
              {msgEmptyList[nav]}
            </h5>
          </div>
        )}
      </section>
      <Modal
        title="Vincular Paciente"
        isOpen={!!open}
        onClose={() => setOpen(null)}
      >
        <>
          <h4 className="text-md">Deseja vincular esse paciente?</h4>
          <p className="text-sm">
            O paciente passa a ser visivel na lista (Meus Paciente) e poderá
            realizar o atendimento.
          </p>
          <div className="border rounded p-4 mt-3 mb-5">
            <p>
              <strong>Nome:</strong>
              {open?.nome}
            </p>
            <p>
              <strong>E-mail:</strong>
              {open?.email}
            </p>
          </div>
          <Button type="button" onClick={handleVincularPaciente}>
            Vincular
          </Button>
        </>
      </Modal>
    </>
  );
};

export default Pacientes;
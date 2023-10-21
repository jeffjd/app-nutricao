'use client';

import { useState } from 'react';
import { FaTableList } from 'react-icons/fa6';
import Spinner from '@/components/Spinner';
import { Button, Input, Modal } from '@/components';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import fetcher from '@/lib/fetch';

interface IConsulta {
  altura: string;
  createdAt: string;
  id: string;
  imc: string;
  pacienteId: string;
  peso: string;
  updatedAt: string;
}

interface HistoricoConsultaProps {
  paciente: any;
}

const HistoricoConsulta: React.FC<HistoricoConsultaProps> = ({ paciente }) => {
  const [nav, setNav] = useState<number>(0);
  // const [open, setOpen] = useState<IPaciente | null>(null);

  const { data, isLoading, mutate } = useSWR<IConsulta[]>(
    `/api/historicoConsulta?pacienteId=${paciente.id}`,
    fetcher,
  );

  //   const handleVincularPaciente = async () => {
  //     try {
  //       const response = await fetch(`/api/paciente`, {
  //         method: 'POST',
  //         body: JSON.stringify({
  //           pacienteId: open?.id,
  //           nutricionistaId: auth.id,
  //         }),
  //       });
  //       const { ok, msg } = await response.json();
  //       if (ok) {
  //         toast.success(msg);
  //         mutate();
  //       } else toast.info(msg);
  //     } catch (error) {
  //       toast.warning('Falha ao vincular paciente1');
  //     } finally {
  //       setOpen(null);
  //     }
  //   };

  return (
    <>
      <section className="max-w-6xl m-auto">
        {isLoading ? (
          <Spinner />
        ) : data && data?.length > 0 ? (
          <>
            {/* <div className="w-1/2 mx-auto my-10">
              <Input label="" placeholder="Buscar pacientes" />
            </div> */}
            <div className="flex flex-wrap gap-4 mt-4 px-4">
              {data?.map((item, index) => (
                <div
                  key={index}
                  className="border rounded p-4 flex flex-col justify-center items-center gap-2 cursor-pointer"
                >
                  <div className="rounded-lg h-14 w-14 bg-black/20 flex justify-center items-center">
                    <FaTableList size={24} className="text-white" />
                  </div>
                  <div>
                    <p>
                      <strong className="mr-1">Peso:</strong>
                      {item.peso} kg
                    </p>
                    <p>
                      <strong className="mr-1">Altura:</strong>
                      {item.altura} m
                    </p>
                    <p>
                      <strong className="mr-1">IMC:</strong>
                      {item.imc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div>
            <h5 className="font-semibold text-xl text-center mt-10 border rounded-md p-4 w-fit mx-auto px-4">
              Não existe histórico no momento
            </h5>
          </div>
        )}
      </section>
    </>
  );
};

export default HistoricoConsulta;
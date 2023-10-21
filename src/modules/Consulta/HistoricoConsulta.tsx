'use client';

import { useState } from 'react';
import { FaTableList } from 'react-icons/fa6';
import Spinner from '@/components/Spinner';
import useSWR from 'swr';
import fetcher from '@/lib/fetch';
import { FaTimes } from 'react-icons/fa';
import { Modal } from '@/components';

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
  const [open, setOpen] = useState<IConsulta | null>(null);

  const { data, isLoading, mutate } = useSWR<IConsulta[]>(
    `/api/historicoConsulta?pacienteId=${paciente.id}`,
    fetcher,
  );

  const formatData = (text: string) => {
    let data = new Date(text);

    let dia: string | number = data.getDate();
    let mes: string | number = data.getMonth() + 1;
    let ano = data.getFullYear();

    dia = dia < 10 ? '0' + dia : dia;
    mes = mes < 10 ? '0' + mes : mes;

    let dataFormatada = dia + '/' + mes + '/' + ano;

    return dataFormatada;
  };

  const selectedConsulta = (consulta: IConsulta) => {
    setOpen(consulta);
  };

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
            <div className="flex flex-wrap min-w-[200px] gap-4 mt-4 px-4">
              {data?.map((item, index) => (
                <div
                  key={index}
                  className="relative border rounded p-4 flex flex-col justify-center items-center gap-2 cursor-pointer"
                  onClick={() => selectedConsulta(item)}
                >
                  {/* <div className="absolute right-0 top-0 flex justify-center items-center h-5 w-5 bg-red-700/30 rounded-sm">
                    <FaTimes size={12} className="text-red-600" />
                  </div> */}
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
                    <p>
                      <strong className="mr-1">Data:</strong>
                      {formatData(item.createdAt)}
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
      <Modal
        title="Gerenciar consulta"
        isOpen={!!open}
        onClose={() => setOpen(null)}
      >
        <div>
          <div>
            <p>
              <strong className="mr-1">Peso:</strong>
              {open?.peso} kg
            </p>
            <p>
              <strong className="mr-1">Altura:</strong>
              {open?.altura} m
            </p>
            <p>
              <strong className="mr-1">IMC:</strong>
              {open?.imc}
            </p>
            <p>
              <strong className="mr-1">Data:</strong>
              {formatData(open?.createdAt as string)}
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default HistoricoConsulta;
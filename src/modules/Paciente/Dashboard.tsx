'use client';

import { Button } from '@/components';
import Spinner from '@/components/Spinner';
import fetcher from '@/lib/fetch';
import { formatData, timestampData } from '@/util/formatDate';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import useSWR from 'swr';

interface DashboardProps {
  auth: any;
}

const Dashboard: React.FC<DashboardProps> = ({ auth }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [select, setSelect] = useState<any[]>([]);

  const { data, isLoading, mutate } = useSWR(
    `/api/historicoConsulta?pacienteId=${auth.id}`,
    fetcher,
  );

  const {
    data: receitaConsumida,
    isLoading: isLoadingReceitaConsumida,
    mutate: receitaConsumidaMutate,
  } = useSWR(
    data && data[0] ? `/api/confirmaConsumo?consultaId=${data[0].id}` : null,
    fetcher,
  );

  const handleSelectReceita = (obj: any) => {
    const index = select.findIndex((item: any) => item === obj);
    if (index === -1) {
      setSelect([...select, obj]);
    } else {
      const novoArray = [...select];
      novoArray.splice(index, 1);
      setSelect(novoArray);
    }
  };

  const handleConfirmaConsumo = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/confirmaConsumo`, {
        method: 'POST',
        body: JSON.stringify({ select }),
      });
      const { ok, msg } = await response.json();
      if (ok) {
        toast.success(msg);
      } else toast.warning(msg);
    } catch (error) {
      toast.warning('Erro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pb-10">
      <div className="max-w-6xl m-auto bg-azulescuro">
        <div className="flex justify-around py-12">
          <span className="flex align-middle text-3xl md:text-5xl">
            {auth.nome}
          </span>
          <div className="bg-gray-500 w-28 h-28 rounded-full md:w-36 md:h-36 flex justify-center items-center">
            <FaUser size={40} className="text-white" />
          </div>
        </div>
      </div>
      <div className="max-w-6xl m-auto bg-verdeazulado p-5 flex justify-between items-start">
        <div>
          <h6 className="mb-3">
            <strong className="mr-1">Paciente:</strong>
            {auth.nome}
          </h6>
          <p>
            <strong className="mr-1">Email:</strong>
            {auth.email}
          </p>
        </div>
      </div>
      <div>
        {isLoading ? <Spinner /> : null}
        {data && data[0] ? (
          <>
            <h3 className="text-xl text-center my-4 font-bold">
              Detalhe da sua consulta
            </h3>
            <div className="pl-5">
              <p>
                <strong className="mr-1">Data:</strong>
                {formatData(data[0].createdAt)}
              </p>
              <p>
                <strong className="mr-1">Retorno:</strong>
                {formatData(timestampData(data[0].retorno))}, ({data[0].retorno}
                ) Dias
              </p>
            </div>
            <hr className="mt-3" />
            <div className="mx-4 my-4">
              <h4 className="font-bold">Dieta</h4>
              <p>
                Atenção marque apenas o que consumiu, essa ação não poderá ser
                desfeita.
              </p>
            </div>
            {data[0].receitaConsulta.map((item: any, index: number) => {
              // console.log(item);

              const test = receitaConsumida?.filter((i: any, index: number) => {
                const hasEqualId = i.receitaConsultaId === item.id;
                if (hasEqualId) {
                  const data1 = new Date();
                  const data2 = new Date(i.createdAt);

                  const mesDia1 = {
                    mes: data1.getUTCMonth() + 1,
                    dia: data1.getUTCDate(),
                  };
                  const mesDia2 = {
                    mes: data2.getUTCMonth() + 1,
                    dia: data2.getUTCDate(),
                  };

                  return (
                    mesDia1.mes === mesDia2.mes && mesDia1.dia === mesDia2.dia
                  );
                }
              });
              console.log(test);

              return (
                <div key={index} className="flex border p-3 mx-4 gap-10">
                  <input
                    type="checkbox"
                    checked={select.filter((i) => i === item).length > 0}
                    onChange={() => handleSelectReceita(item)}
                  />
                  <div className="flex flex-col">
                    <div>
                      <strong className="mr-1">Refeição:</strong>
                      {item.receita.nome}
                    </div>
                    <div>
                      {item.receita.ingredientes.map(
                        (receita: any, index: number) => (
                          <div key={index}>
                            <p>
                              <strong className="mr-1">Alimento:</strong>
                              {receita.ingrediente.nome}
                            </p>
                            <p>
                              <strong className="mr-1">Quantidade</strong>
                              {receita.quantidade}
                            </p>
                            <p>
                              <strong className="mr-1">Calorias:</strong>
                              {receita.ingrediente.calorias *
                                receita.quantidade}
                            </p>
                            <p>
                              <strong className="mr-1">Unidade</strong>
                              {receita.ingrediente.unidade}
                            </p>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            {select.length > 0 ? (
              <div className="m-4">
                <Button
                  disabled={select.length < 0}
                  type="button"
                  onClick={handleConfirmaConsumo}
                >
                  Confirmar
                </Button>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </section>
  );
};

export default Dashboard;
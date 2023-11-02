'use client';

import { Button } from '@/components';
import Spinner from '@/components/Spinner';
import fetcher from '@/lib/fetch';
import {
  converterStringParaData,
  formatData,
  timestampData,
} from '@/util/formatDate';
import { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import useSWR from 'swr';

interface DashboardProps {
  auth: any;
}

const Dashboard: React.FC<DashboardProps> = ({ auth }) => {
  const [loading, setLoading] = useState<boolean>(false);

  let dataAtual = new Date();
  let novaData = new Date(dataAtual.getTime() + 86400000);
  let novaDataISO = novaData.toISOString();

  //const dateNow = formatData(novaDataISO); //dia posterior
  const dateNow = formatData(new Date().toISOString()); //dia de hoje
  const [select, setSelect] = useState<any[]>([]);

  const {
    data: consulta,
    isLoading: isLoadingConsulta,
    mutate: consultaMutate,
  } = useSWR(
    `/api/historicoConsulta?pacienteId=${auth.id}&status=true`,
    fetcher,
  );

  const {
    data: receitaConsumida,
    isLoading: isLoadingReceitaConsumida,
    mutate: receitaConsumidaMutate,
  } = useSWR(
    consulta && consulta[0]
      ? `/api/confirmaConsumo?consultaId=${consulta[0].id}`
      : null,
    fetcher,
  );

  useEffect(() => {
    if (consulta) {
      const handleCloseConsultaPaciente = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `/api/consulta?consultaId=${consulta[0].id}&close=true`,
          );
          const { ok, msg } = await response.json();
          if (ok) {
            toast.success(msg);
            consultaMutate();
          } else toast.warning(msg);
        } catch (error) {
          toast.warning('Erro');
        } finally {
          setLoading(false);
        }
      };

      let data1 = converterStringParaData(dateNow);
      let data2 = converterStringParaData(
        formatData(timestampData(consulta[0]?.retorno)),
      );

      if (data1 >= data2) {
        handleCloseConsultaPaciente();
      }
    }
  }, [consulta]);

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
        body: JSON.stringify({ select, dateNow }),
      });
      const { ok, msg } = await response.json();
      if (ok) {
        toast.success(msg);
        setSelect([]);
        consultaMutate();
        receitaConsumidaMutate();
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
        <div className="flex justify-start py-1">
          <span className="flex align-middle text-2xl pl-10 pr-4">
            {auth.nome}
          </span>
          <div className="bg-gray-500 w-8 h-8 rounded-full flex justify-center items-center">
            <FaUser size={10} className="text-white" />
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
        {isLoadingConsulta || isLoadingReceitaConsumida ? <Spinner /> : null}
        {consulta && consulta[0] ? (
          <div>
            <h3 className="text-xl text-center my-4 font-bold">
              Detalhe da sua consulta
            </h3>
            <div className="pl-5">
              <p>
                <strong className="mr-1">Data:</strong>
                {formatData(consulta[0].createdAt)}
              </p>
              <p>
                <strong className="mr-1">Retorno:</strong>
                {formatData(timestampData(consulta[0].retorno))}, (
                {consulta[0].retorno}) Dias
              </p>
            </div>
            <hr className="mt-3" />
            <h5 className="mt-2">
              Data de hoje: <strong>{dateNow}</strong>
            </h5>
            <div className="mx-4 my-4">
              <h4 className="font-bold">Dieta</h4>
              <p>
                Atenção marque apenas o que consumiu, essa ação não poderá ser
                desfeita.
              </p>
            </div>
            {consulta[0].receitaConsulta.map((item: any, index: number) => {
              const consumido = receitaConsumida?.filter(
                (i: any, index: number) => {
                  const hasEqualId = i.receitaConsultaId === item.id;

                  return hasEqualId && i.createdAt === dateNow;
                },
              );

              return (
                <div
                  key={index}
                  className={`flex border p-3 mx-4 gap-10 ${
                    consumido?.length > 0 ? 'bg-slate-100' : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    disabled={consumido?.length > 0}
                    checked={
                      select.filter((i) => i === item).length > 0 ||
                      consumido?.length > 0
                    }
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
          </div>
        ) : (
          <div className="text-center font-bold text-2xl mt-10">
            <h3>Você não tem uma acompanhamento no momento</h3>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;

'use client';

import { useEffect, useState } from 'react';
import { FaTableList } from 'react-icons/fa6';
import Spinner from '@/components/Spinner';
import useSWR from 'swr';
import fetcher from '@/lib/fetch';
import { FaTimes } from 'react-icons/fa';
import { Input, Modal } from '@/components';
import { toast } from 'react-toastify';
import { FormikHelpers, useFormik } from 'formik';

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

interface IInitialValues {
  dataInicio: string;
  duracao: string;
  receitas: IReceita[];
}

interface IReceita {
  id: string;
  nome: string;
  ingredientes: IIngredienteQuantidade[];
}

interface IIngrediente {
  calorias: number;
  id: string;
  nome: string;
  unidade: string;
}

interface IIngredienteQuantidade {
  id: string;
  receitaId: string;
  ingredienteId: string;
  quantidade: number;
  ingrediente: IIngrediente;
}

const HistoricoConsulta: React.FC<HistoricoConsultaProps> = ({ paciente }) => {
  const [nav, setNav] = useState<number>(0);
  const [open, setOpen] = useState<IConsulta | null>(null);
  const [receitas, setReceitas] = useState<IReceita[]>([]);

  useEffect(() => {
    fetch('/api/receita')
      .then((res) => res.json())
      .then((data) => {
        setReceitas(data);
      });
  }, []);

  const somarCalorias = (ingredientes: IIngredienteQuantidade[]) => {
    let soma: number = 0;
    for (let i = 0; ingredientes.length > i; i++) {
      soma += ingredientes[i].ingrediente.calorias * ingredientes[i].quantidade;
    }
    return soma;
  };

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

  const initialValues: IInitialValues = {
    dataInicio: '',
    duracao: '',
    receitas: [],
  };

  const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues,
    onSubmit: async (values, formikHelpers: FormikHelpers<IInitialValues>) => {
      try {
        const response = await fetch(`/api/consulta`, {
          method: 'POST',
          body: JSON.stringify({ ...values, pacienteId: paciente.id }),
        });
        const { ok, msg } = await response.json();
        if (ok) {
          toast.success(msg);
          formikHelpers.resetForm({ values: initialValues });
        } else toast.warning(msg);
      } catch (error) {
        toast.warning('Falha no cadastro');
      } finally {
      }
    },
  });

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
            <form className="space-y-6 mt-3" onSubmit={handleSubmit}>
              <Input
                label="Duração"
                name="dracao"
                type="number"
                value={values.duracao}
                onChange={handleChange}
              />
              <Input
                label="Data de Início"
                name="dataInicio"
                type="date"
                value={values.dataInicio}
                onChange={handleChange}
              />

              <h4>
                <strong>Receitas</strong>
              </h4>

              {receitas.map((itemReceita, indexReceita) => (
                <div
                  key={indexReceita}
                  className="w-full border rounded-lg drop-shadow-md p-4 cursor-pointer"
                >
                  <h4 className="font-semibold text-lg border-b border-gray-100">
                    {itemReceita.nome}
                  </h4>
                  <div className="mt-3">
                    <div className="border rounded p-2 mb-2">
                      <p className="pb-2">
                        <strong className="pr-1">Ingrediente:</strong>
                        {itemReceita.ingredientes.map(
                          (
                            IngredienteQuantidade,
                            indexIngredienteQuantidade,
                          ) => (
                            <span
                              key={indexIngredienteQuantidade}
                              className="border rounded-md p-1 ml-2"
                            >
                              {IngredienteQuantidade.ingrediente.nome}
                            </span>
                          ),
                        )}
                      </p>
                      <p>
                        <strong className="pr-1">Calorias Totais:</strong>
                        {somarCalorias(itemReceita.ingredientes)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default HistoricoConsulta;
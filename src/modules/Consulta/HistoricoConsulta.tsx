'use client';

import { useEffect, useState } from 'react';
import { FaTableList } from 'react-icons/fa6';
import Spinner from '@/components/Spinner';
import useSWR from 'swr';
import fetcher from '@/lib/fetch';
import { FaTimes } from 'react-icons/fa';
import { Button, GraficoLinha, Input, Modal } from '@/components';
import { toast } from 'react-toastify';
import { FormikHelpers, useFormik } from 'formik';
import { formatData, timestampData } from '@/util/formatDate';
import VMasker from 'vanilla-masker';
import { handleIMC } from '@/util/functionIMC';

interface IConsulta {
  createdAt: string;
  id: string;
  pacienteId: string;
  updatedAt: string;
  pesoFinal: number | null;
  pesoInicial: number;
  pesoObjetivo: number;
  points: number | null;
  retorno: number;
  status: boolean;
  receitaConsulta: [];
}

interface HistoricoConsultaProps {
  paciente: any;
}

interface IInitialValues {
  pesoFinal: string;
  altura: string;
  imc: string;
  points: number;
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
  const [open, setOpen] = useState<IConsulta | null>(null);
  const [resultado, setResultado] = useState('');
  const [Loading, setLoading] = useState<boolean>(false);

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

  const { data: receitas, isLoading: isLoadingReceitas } = useSWR<IReceita[]>(
    `/api/receita`,
    fetcher,
  );

  const selectedConsulta = (consulta: IConsulta) => {
    setOpen(consulta);
  };

  const { data: graficoMaldito, isLoading: isLoadingGraficoMaldito } = useSWR(
    open ? `/api/historicoConsumo?consultaId=${open.id}` : null,
    fetcher,
  );

  const initialValues: IInitialValues = {
    pesoFinal: '',
    altura: '',
    imc: '',
    points: 0,
  };

  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    onSubmit: async (values, formikHelpers: FormikHelpers<IInitialValues>) => {
      setLoading(true);
      try {
        const consultaId = open?.id;
        const response = await fetch(`/api/consulta`, {
          method: 'PUT',
          body: JSON.stringify({
            ...values,
            pesoFinal: Number(values.pesoFinal),
            consultaId,
          }),
        });
        const { ok, msg } = await response.json();
        if (ok) {
          formikHelpers.resetForm({ values: initialValues });
          setOpen(null);
          toast.success(msg);
          mutate();
        } else toast.warning(msg);
      } catch (error) {
        toast.warning('Falha no cadastro');
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (open) {
      const pesoPerdidoEsperado = open?.pesoInicial - open?.pesoObjetivo;
      const pesoPerdidoFinal = open?.pesoInicial - Number(values.pesoFinal);

      if (pesoPerdidoFinal >= pesoPerdidoEsperado * 0.7) {
        console.log('menor ou igual a 70%');
        setFieldValue('points', open.retorno * 10);
      } else {
        console.log('menor ou igual a 50%');
        setFieldValue('points', (open.retorno * 10) / 2);
      }
    }
  }, [values.imc]);

  return (
    <>
      <section className="max-w-6xl m-auto">
        {isLoading || isLoadingGraficoMaldito || Loading ? (
          <Spinner />
        ) : data && data?.length > 0 ? (
          <>
            <div className="flex flex-wrap min-w-[200px] gap-4 mt-4 px-4">
              {data?.map((item, index) => (
                <div
                  key={index}
                  className="relative border rounded p-4 flex flex-col justify-center items-center gap-2 cursor-pointer"
                  onClick={() => {
                    selectedConsulta(item);
                  }}
                >
                  {/* <div className="absolute right-0 top-0 flex justify-center items-center h-5 w-5 bg-red-700/30 rounded-sm">
                    <FaTimes size={12} className="text-red-600" />
                  </div> */}
                  <div className="rounded-lg h-14 w-14 bg-black/20 flex justify-center items-center">
                    <FaTableList size={24} className="text-white" />
                  </div>
                  <div>
                    <p>
                      <strong className="mr-1">Peso inicial:</strong>
                      {item.pesoInicial} kg
                    </p>
                    <p>
                      <strong className="mr-1">Objetivo peso:</strong>
                      {item.pesoObjetivo} kg
                    </p>
                    <p>
                      <strong className="mr-1">Atendimento:</strong>
                      {formatData(item.createdAt)}
                    </p>
                    <p>
                      <strong className="mr-1">Retorno:</strong>
                      {formatData(timestampData(item.retorno))}
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
          {open && (
            <div>
              <div>
                <p>
                  <strong className="mr-1">Peso inicial:</strong>
                  {open.pesoInicial} kg
                </p>
                <p>
                  <strong className="mr-1">Objetivo peso:</strong>
                  {open.pesoObjetivo} kg
                </p>
                <p>
                  <strong className="mr-1">Atendimento:</strong>
                  {formatData(open.createdAt)}
                </p>
                <p>
                  <strong className="mr-1">Retorno:</strong>
                  {formatData(timestampData(open.retorno))}
                </p>
              </div>
              <GraficoLinha cal={graficoMaldito || [[]]} />
              <hr className="my-3" />
              <form onSubmit={handleSubmit}>
                <Input
                  label="Peso atingido"
                  name="pesoFinal"
                  type="text"
                  icon="KG"
                  value={values.pesoFinal}
                  onChange={(event) => {
                    setFieldValue(
                      'pesoFinal',
                      VMasker.toPattern(event.target.value, '999'),
                    );
                    setFieldValue('points', 0);
                  }}
                  onMouseLeave={() =>
                    handleIMC(
                      values.pesoFinal,
                      values.altura,
                      setResultado,
                      setFieldValue,
                    )
                  }
                />
                <Input
                  label="Altura"
                  name="altura"
                  type="text"
                  icon="M"
                  value={values.altura}
                  onChange={(event) => {
                    setFieldValue(
                      'altura',
                      VMasker.toPattern(event.target.value, '9,99'),
                    );
                    setFieldValue('points', 0);
                  }}
                  onMouseLeave={() =>
                    handleIMC(
                      values.pesoFinal,
                      values.altura,
                      setResultado,
                      setFieldValue,
                    )
                  }
                />
                {resultado ? (
                  <p className="mt-3 mb-3 border-2 p-4 rounded-md border-blue-700 text-center font-semibold bg-blue-500 text-blue-700">
                    {resultado}
                  </p>
                ) : null}
                {values.points !== 0 ? (
                  <>
                    <Input
                      readOnly
                      label="Pontuação a receber"
                      type="text"
                      icon="Pontos"
                      value={values.points}
                    />
                    <Button type="submit" className="mt-3">
                      Finalizar Atendimento
                    </Button>
                  </>
                ) : null}
              </form>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default HistoricoConsulta;
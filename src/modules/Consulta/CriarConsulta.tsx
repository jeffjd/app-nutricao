'use client';

import { FormikHelpers, useFormik } from 'formik';
import { AutoCompleteInput, Button, Input, Select } from '../../components';
import { toast } from 'react-toastify';
import VMasker from 'vanilla-masker';
import { Dispatch, SetStateAction, useState } from 'react';
import Spinner from '@/components/Spinner';
import { IOptions, IReceita } from '@/helper/interface';
import useSWR from 'swr';
import fetcher from '@/lib/fetch';
import { FaTimes } from 'react-icons/fa';
import { formatData, timestampData } from '@/util/formatDate';

const optionsRetorno = [
  { label: '30 dias', value: 30 },
  { label: '45 dias', value: 45 },
  { label: '60 dias', value: 60 },
];

interface IInitialValues {
  retorno: IOptions | null;
  receitas: IReceita[];
  pesoObjetivo: string;
  pesoInicial: string;
}

interface CriarConsultaProps {
  paciente: any;
  nextStep: Dispatch<SetStateAction<number>>;
  nutricionistaId: string;
}

let today = new Date();

const CriarConsulta: React.FC<CriarConsultaProps> = ({
  paciente,
  nutricionistaId,
  nextStep,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const initialValues: IInitialValues = {
    retorno: null,
    pesoObjetivo: '',
    pesoInicial: '',
    receitas: [],
  };

  const { data, isLoading, mutate } = useSWR<IReceita[]>(
    `/api/receita?nutricionistaId=${nutricionistaId}`,
    fetcher,
  );

  const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues,
    onSubmit: async (values, formikHelpers: FormikHelpers<IInitialValues>) => {
      setLoading(true);
      try {
        const response = await fetch(`/api/consulta`, {
          method: 'POST',
          body: JSON.stringify({ ...values, pacienteId: paciente.id }),
        });
        const { ok, msg } = await response.json();
        if (ok) {
          toast.success(msg);
          formikHelpers.resetForm({ values: initialValues });
          nextStep(1);
        } else toast.warning(msg);
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
            Criar nova consulta
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Peso Inicial"
              name="pesoInicial"
              type="text"
              value={values.pesoInicial}
              placeholder="Colocar peso atual do paciente..."
              onChange={handleChange}
              icon="KG"
            />
            <Input
              label="Peso Desejado"
              name="pesoObjetivo"
              type="text"
              value={values.pesoObjetivo}
              placeholder="Colocar peso que deseja alcançar..."
              onChange={handleChange}
              icon="KG"
            />
            <Select
              label="Próxima consulta"
              name="retorno"
              options={optionsRetorno}
              value={values.retorno}
              setFieldValue={setFieldValue}
            />
            {values.retorno ? (
              <span>
                O retorno ficara marcado para o dia:
                <strong className="mr-1">
                  {formatData(timestampData(values.retorno.value as number))}
                </strong>
              </span>
            ) : null}

            <AutoCompleteInput
              name="receitas"
              label="Receitas"
              options={data as IReceita[]}
              value={values.receitas}
              setFieldValue={setFieldValue}
            />

            <ul className="border p-4 divide-y-2">
              {values.receitas.length > 0 ? (
                values.receitas.map((receita, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center py-4"
                  >
                    <div className="">
                      <h6>
                        <strong className="mr-1">Refeição:</strong>
                        {receita.nome}
                      </h6>
                      <ul className="divide-y divide-gray-300 mt-2 list-disc pl-7">
                        {receita.ingredientes.map(
                          (ingrediente, indexIngrediente) => (
                            <li key={indexIngrediente} className="pb-1 mb-1">
                              <div className="text-sm">
                                <p>
                                  <strong className="mr-1">Nome:</strong>
                                  {ingrediente.ingrediente.nome}
                                </p>
                                <p>
                                  <strong className="mr-1">Quantidade:</strong>
                                  <span className="mr-1">
                                    {ingrediente.quantidade}
                                  </span>
                                  {ingrediente.ingrediente.unidade}(s)
                                </p>
                                <p>
                                  <strong className="mr-1">Calorias:</strong>
                                  {ingrediente.ingrediente.calorias *
                                    ingrediente.quantidade}
                                </p>
                              </div>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                    <FaTimes
                      size={12}
                      className="cursor-pointer"
                      onClick={() => {
                        let novoArray = values.receitas.filter(
                          (item) => item.id !== receita.id,
                        );
                        setFieldValue('receitas', novoArray);
                      }}
                    />
                  </li>
                ))
              ) : (
                <div>Selecione uma receita para o paciente.</div>
              )}
            </ul>

            <div>
              <Button type="submit">Criar</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CriarConsulta;

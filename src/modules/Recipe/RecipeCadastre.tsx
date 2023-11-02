'use client';

import { FormikHelpers, useFormik } from 'formik';
import { Button, Input, AutoCompleteInput } from '../../components';
import { toast } from 'react-toastify';
import { FaAngleUp, FaTimes } from 'react-icons/fa';
import { FaAngleDown } from 'react-icons/fa6';
import useSWR from 'swr';
import fetcher from '@/lib/fetch';

interface IIngredient {
  calorias: number;
  id: string;
  nome: string;
  unidade: string;
  quantidade: number;
}

interface IInitialValues {
  nome: string;
  ingredientes: IIngredient[];
}

interface IRecipeCadastre {
  nutricionistaId: string;
}

const RecipeCadastre: React.FC<IRecipeCadastre> = ({ nutricionistaId }) => {
  const initialValues: IInitialValues = {
    nome: '',
    ingredientes: [],
  };

  const useFetchIngredientes = () => {
    const { data, isLoading } = useSWR<IIngredient[]>(
      `/api/ingredientes`,
      fetcher,
    );

    const list = [];
    if (data) {
      for (let i = 0; data.length > i; i++) {
        list.push({ ...data[i], quantidade: 0 });
      }
    }

    return { list, isLoading };
  };

  const { list, isLoading } = useFetchIngredientes();

  const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues,
    onSubmit: async (values, formikHelpers: FormikHelpers<IInitialValues>) => {
      try {
        const { nome, ingredientes } = values;
        const newArray = [];
        for (let i = 0; ingredientes.length > i; i++) {
          const { id, ...rest } = ingredientes[i];
          newArray.push({ ...rest, ingredienteId: id });
        }

        const response = await fetch(`/api/receita`, {
          method: 'POST',
          body: JSON.stringify({
            nome,
            ingredientes: newArray,
            nutricionistaId,
          }),
        });
        const { ok, msg } = await response.json();
        if (ok) {
          toast.success(msg);
          formikHelpers.resetForm({ values: initialValues });
        } else toast.warning(msg);
      } catch (error) {
        toast.warning('Falha no cadastro');
      }
    },
  });

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 relative">
          Cadastro de Receita
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Nome"
            name="nome"
            type="text"
            value={values.nome}
            onChange={handleChange}
          />

          <AutoCompleteInput
            name="ingredientes"
            label="Ingredientes"
            options={list as IIngredient[]}
            value={values.ingredientes}
            setFieldValue={setFieldValue}
          />

          <ul className="border p-4 divide-y-2">
            {values.ingredientes.length > 0 ? (
              values.ingredientes.map((ingrediente, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center my-2"
                >
                  <div className="flex items-center divide-x-2 gap-2 pt-2">
                    <span>{ingrediente.nome}</span>
                    <span className="pl-2">
                      calorias: {ingrediente.calorias}
                    </span>
                    <span className="pl-2">unidade: {ingrediente.unidade}</span>
                    <span className="pl-2 flex items-center gap-2">
                      <span
                        className="border rounded-full h-8 w-8 flex justify-center items-center text-red-500 cursor-pointer"
                        onClick={() => {
                          if (ingrediente.quantidade > 0) {
                            const minus = ingrediente.quantidade - 1;

                            setFieldValue(
                              `ingredientes[${index}].quantidade`,
                              minus,
                            );
                          }
                        }}
                      >
                        <FaAngleDown />
                      </span>
                      {ingrediente.quantidade}
                      <span
                        className="border rounded-full h-8 w-8 flex justify-center items-center text-green cursor-pointer"
                        onClick={() => {
                          const some = ingrediente.quantidade + 1;

                          setFieldValue(
                            `ingredientes[${index}].quantidade`,
                            some,
                          );
                        }}
                      >
                        <FaAngleUp />
                      </span>
                    </span>
                  </div>
                  <FaTimes
                    size={12}
                    className="cursor-pointer"
                    onClick={() => {
                      let novoArray = values.ingredientes.filter(
                        (item) => item.id !== ingrediente.id,
                      );
                      setFieldValue('ingredientes', novoArray);
                    }}
                  />
                </li>
              ))
            ) : (
              <div>Selecione os ingredientes para a receita.</div>
            )}
          </ul>

          <div>
            <Button type="submit">Cadastrar</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeCadastre;

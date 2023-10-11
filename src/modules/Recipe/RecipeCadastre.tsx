import { useFormik } from 'formik';
import { Button, Input, Select } from '../../components';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { FaAngleUp, FaTimes } from 'react-icons/fa';
import { FaAngleDown } from 'react-icons/fa6';

// const ingredientes = [
//   {
//     id: '12asd23',
//     nome: 'Coxa de Frango',
//     calorias: 120,
//     unidade: 1,
//   },
//   {
//     id: '1232d23',
//     nome: 'Feijão',
//     calorias: 120,
//     unidade: 1,
//   },
//   {
//     id: 'asd23',
//     nome: 'Arroz',
//     calorias: 120,
//     unidade: 1,
//   },
// ];

interface IIngredients {
  calorias: number;
  id: string;
  nome: string;
  unidade: string;
  quantidade: number;
}

interface IInitialValues {
  nome: string;
  ingredientes: IIngredients[];
}

const RecipeCadastre: React.FC = () => {
  const [optionsIngredients, setOptionsIngredientes] = useState<IIngredients[]>(
    [],
  );

  const initialValues: IInitialValues = {
    nome: '',
    ingredientes: [],
  };

  useEffect(() => {
    fetch('/api/ingredientes')
      .then((res) => res.json())
      .then((data) => {
        const list = [];
        for (let i = 0; data.data.length > i; i++) {
          list.push({ ...data.data[i], quantidade: 0 });
        }
        setOptionsIngredientes(list);
      });
  }, []);

  const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const { nome, ingredientes } = values;
        const newArray = [];
        for (let i = 0; ingredientes.length > i; i++) {
          const { id, ...rest } = ingredientes[i];
          newArray.push({ ...rest });
        }

        const response = await fetch(`/api/receita`, {
          method: 'POST',
          body: JSON.stringify({ nome, ingredientes: newArray }),
        });
        const data = await response.json();
        toast.success(data.message);
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
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Nome"
            name="nome"
            type="text"
            value={values.nome}
            onChange={handleChange}
          />

          <Select
            name="ingredientes"
            options={optionsIngredients}
            values={values.ingredientes}
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

          {/*
          <select className="block w-full rounded-md border py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none">
            {ingredientes.map((ingredient, index) => (
              <option key={index} value={ingredient.id}>
                {ingredient.nome}
              </option>
            ))}
            </select>*/}

          <div>
            <Button type="submit">Cadastrar</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeCadastre;

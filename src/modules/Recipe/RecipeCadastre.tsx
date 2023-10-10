import { useFormik } from 'formik';
import { Button, Input, Select } from '../../components';
import { toast } from 'react-toastify';
import { useState } from 'react';

const ingredientes = [
  {
    id: '12asd23',
    nome: 'Coxa de Frango',
    calorias: 120,
    unidade: 1,
  },
  {
    id: '1232d23',
    nome: 'Feijão',
    calorias: 120,
    unidade: 1,
  },
  {
    id: 'asd23',
    nome: 'Arroz',
    calorias: 120,
    unidade: 1,
  },
];

const ingredientsNameList = ['Coxa de Frango', 'Feijão', 'Arroz'];

const RecipeCadastre: React.FC = () => {
const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const initialValues = {
    nome: '',
    ingredientes: [],
    calorias: '',
  };

  const { values, handleSubmit, handleChange } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const response = await fetch(`/api/create/recipe`, {
          method: 'POST',
          body: JSON.stringify(values),
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

          <Select options={ingredientsNameList} selectedOptions={selectedIngredients} changeSelectedOptions={setSelectedIngredients} />

          <div>
            {selectedIngredients.map((ingredient, index) => (
              <p key={index}>{ingredient}</p>
            ))}
          </div>



          <select className="block w-full rounded-md border py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none">
            {ingredientes.map((ingredient, index) => (
              <option key={index} value={ingredient.id}>
                {ingredient.nome}
              </option>
            ))}
          </select>

          <div>
            <Button type="submit">Cadastrar</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeCadastre;
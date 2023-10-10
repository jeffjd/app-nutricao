'use client';

import { InputSearch, TagList, Card } from '@/components';

const nomes = [
  { id: 1, nome: 'Marcador 1' },
  { id: 2, nome: 'Marcador 2' },
  { id: 3, nome: 'Marcador 3' },
];

const receitas = [
  { nome: 'Prato do almoço' },
  { nome: 'Prato do janta' },
  { nome: 'Lanche' },
  { nome: 'Refeição da janta' },
  { nome: 'Refeição da almoço' },
  { nome: 'Brunch' },
  { nome: 'Comida gostosa' },
  { nome: 'Comida horrível' },
  { nome: 'Comida Saborosa' },
];

const ingredientes = [
  { nome: 'Batata', quantidade: '3' },
  { nome: 'Feijão', quantidade: '200g' },
  { nome: 'Arroz', quantidade: '200g' },
  { nome: 'Coxa de Frango', quantidade: '2' },
  { nome: 'Ovo', quantidade: '1' },
  { nome: 'Alface', quantidade: '2' },
];

const RecipeShowcase: React.FC = () => {
  const nutricionista = {
    nome: 'Doutor Fulano',
  };
  return (
    <div>

      <InputSearch />
      <div className="max-w-6xl m-auto bg-azulescuro flex justify-around">
        <div className="flex justify-around flex-wrap ">
          {receitas.map((receita, index) => (
            <div
              key={index}
              className="bg-white m-4 p-4 shadow-lg rounded-lg w-52"
            >
              <Card nome={receita.nome} />
            </div>
          ))}
        </div>
        <div className="container mx-auto p-4 flex justify-center">
          <TagList nomes={nomes} />
        </div>
      </div>

      <span className="text-start text-2xl max-w-6xl m-auto bg-azulescuro flex justify-around py-5">
        Receita
      </span>
      <div className="max-w-6xl m-auto bg-azulescuro flex justify-between">
        <div className="flex flex-col justify-around text-lg">
          <div className="p-2 font-medium">Nome:</div>
          <div className="p-2 font-medium">Calorias Totais:</div>
          <div className="p-2 font-medium">Pontos:</div>
          <div className="p-2">
            <span className="font-medium">Ingredientes</span>
            <div className="flex flex-col">
              {ingredientes.map((ingrediente, index) => (
                <div key={index} className="p-2">
                  {ingrediente.nome} : {ingrediente.quantidade}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="pr-5 pb-5">
          <div className="h-60 w-60 bg-gray-500"></div>
        </div>
      </div>
    </div>
  );
};

export default RecipeShowcase;

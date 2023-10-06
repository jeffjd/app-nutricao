'use client';

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import InputBusca from '../../components/InputBusca/InputBusca';
import ListarTags from '../../components/ListarTags/ListarTags';
import MostrarObjeto from '../../components/MostrarObjeto/MostrarObjeto';
import NavNutricionista from '../../components/NavNutricionista/NavNutricionista';

const nomes = [
  { id: 1, nome: 'Nome 1' },
  { id: 2, nome: 'Nome 2' },
  { id: 3, nome: 'Nome 3' },
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

const ReceitasVitrine: React.FC = () => {
  const nutricionista = {
    nome: 'Doutor Fulano',
  };
  return (
    <div>
      <Header nome={nutricionista.nome} />
      <NavNutricionista />

      <InputBusca />
      <div className="max-w-6xl m-auto bg-azulescuro flex justify-around">
        <div className="flex justify-around flex-wrap ">
          {receitas.map((receita, index) => (
            <div key={index} className="bg-white m-4 p-4 shadow-lg rounded-lg w-fit">
              <MostrarObjeto nome={receita.nome} />
            </div>
          ))}
        </div>
        <div className="container mx-auto p-4 flex justify-end">
          <ListarTags nomes={nomes} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ReceitasVitrine;
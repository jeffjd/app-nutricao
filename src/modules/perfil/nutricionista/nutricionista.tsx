import {CardList} from '@/components'

interface IPerfilNutricionista {
  nutricionista: {
    nome: string;
  };
}

const pacientes = [
  { nome: 'Fulano' },
  { nome: 'Beltrano' },
  { nome: 'Ana' },
  { nome: 'Carolina' },
  { nome: 'Carlos' },
  { nome: 'Oliver' },
  { nome: 'Oliver' },
  { nome: 'Oliver' },
  { nome: 'Oliver' },
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

const PerfilNutricionista: React.FC<IPerfilNutricionista> = ({
  nutricionista,
}) => {
  return (
    <>

      <div className="max-w-6xl m-auto bg-azulescuro">
        <CardList nome="Pacientes" conteudo={pacientes} />
        <CardList nome="Receitas" conteudo={receitas} />
      </div>

    </>
  );
};

export default PerfilNutricionista;

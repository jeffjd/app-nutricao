import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import ListarConteudo from '../../../components/ListarConteudo/ListarConteudo';
import NavNutricionista from '../../../components/NavNutricionista/NavNutricionista';

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
      <Header nome={nutricionista.nome} />
      <NavNutricionista />
      <div className="max-w-6xl m-auto bg-azulescuro">
        <ListarConteudo nome="Pacientes" conteudo={pacientes} />
        <ListarConteudo nome="Receitas" conteudo={receitas} />
      </div>
      <Footer />
    </>
  );
};

export default PerfilNutricionista;

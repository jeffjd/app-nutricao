import ListarConteudo from '../../components/ListarConteudo/ListarConteudo';

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

const PerfilNutricionista: React.FC = () => {
  return (
    <div className="max-w-6xl m-auto rounded-md bg-azulescuro">
      <div className="max-w-6xl m-auto rounded-md bg-azulescuro">
        <div className="flex justify-around py-12">
          <span className="flex align-middle text-3xl md:text-5xl">
            Doutor Trogodita
          </span>
          <div className="bg-gray-500 w-28 h-28 rounded-full md:w-36 md:h-36"></div>
        </div>
      </div>
      <ListarConteudo nome="Pacientes" conteudo={pacientes} />
    </div>
  );
};

export default PerfilNutricionista;
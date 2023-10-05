import MostrarObjeto from '../MostrarObjeto/MostrarObjeto';

interface IObjeto {
  nome: string;
}

interface IIlistarConteudo {
  nome: string;
  conteudo: IObjeto[];
}

const ListarConteudo: React.FC<IIlistarConteudo> = ({ nome, conteudo }) => {
  console.log(nome);
  return (
    <div className="w-full flex flex-col">
      <div>{nome}</div>
      <div className="flex overflow-x-auto">
        {conteudo.map((item, index) => (
          <div key={index} className="bg-white m-4 p-4 shadow-lg rounded-lg">
            <MostrarObjeto nome={item.nome} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListarConteudo;
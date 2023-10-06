import MostrarObjeto from '../MostrarObjeto/MostrarObjeto';

interface IObjeto {
  nome: string;
}

interface IIlistarConteudo {
  nome: string;
  conteudo: IObjeto[];
}

const ListarConteudo: React.FC<IIlistarConteudo> = ({ nome, conteudo }) => {
  return (
    <div className="w-full flex flex-col py-7">
      <div className="flex justify-between">
        <div className="text-2xl pl-4 font-medium">{nome}</div>
        <div className="text-lg pr-4">Ver tudo</div>
      </div>
      <div className="flex overflow-x-auto">
        {conteudo.map((item, index) => (
          <div
            key={index}
            className="bg-white m-4 p-4 shadow-lg rounded-lg w-fit"
          >
            <MostrarObjeto nome={item.nome} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListarConteudo;
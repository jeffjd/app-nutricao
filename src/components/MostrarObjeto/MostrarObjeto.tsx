interface IMostrarObjeto {
  nome: string;
}

const MostrarObjeto: React.FC<IMostrarObjeto> = ({ nome }) => {
  return (
    <>
      <div className="bg-gray-500 rounded-full w-16 h-16 m-auto"></div>
      <div className="text-center pt-4">
        <p className="text-xl font-semibold min-h-[75px] min-w-[84px]">{nome}</p>
      </div>
    </>
  );
};

export default MostrarObjeto;
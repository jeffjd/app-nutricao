interface IMostrarObjeto {
    nome: string;
  }
  
  const MostrarObjeto: React.FC<IMostrarObjeto> = ({ nome }) => {
    return (
      <>
        <div className="bg-gray-500 rounded-full w-16 h-16 m-auto"></div>
        <div className="text-center">
          <p className="text-xl font-semibold">{nome}</p>
        </div>
      </>
    );
  };
  
  export default MostrarObjeto;
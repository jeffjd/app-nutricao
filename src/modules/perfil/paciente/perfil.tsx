const PerfilPaciente: React.FC = () => {
    return (
      <div className="max-w-6xl m-auto bg-azulescuro">
        <div className="m-auto bg-azulescuro">
          <div className="flex justify-around py-12">
            <span className="flex align-middle text-3xl md:text-5xl">
              Paciente Ciclano
            </span>
            <div className="bg-gray-500 w-28 h-28 rounded-full md:w-36 md:h-36"></div>
          </div>
        </div>
        <div className="bg-verdeazulado text-xl py-3 flex justify-evenly">
          <div className="">Meus pacientes</div>
          <div>Minhas receitas</div>
          <div>Meu cadastro</div>
        </div>
      </div>
    );
  };
  
  export default PerfilPaciente;
interface IHeader {
  nome: string;
}

const Header: React.FC<IHeader> = ({ nome }) => {
  return (
    <header className="max-w-6xl m-auto bg-azulescuro">
      <div className="flex justify-around py-12">
        <span className="flex align-middle text-3xl md:text-5xl">{nome}</span>
        <div className="bg-gray-500 w-28 h-28 rounded-full md:w-36 md:h-36"></div>
      </div>
    </header>
  );
};

export default Header;

import React, { useState } from 'react';
import { RiCheckboxBlankLine, RiCheckboxFill } from 'react-icons/ri';

interface Nome {
  id: number;
  nome: string;
}

interface ListarTagsProps {
  nomes: Nome[];
}

const ListarTags: React.FC<ListarTagsProps> = ({ nomes }) => {
  const [nomesSelecionados, setNomesSelecionados] = useState<number[]>([]);

  const alterarNomesSelecionados = (id: number) => {
    if (nomesSelecionados.includes(id)) {
      setNomesSelecionados(nomesSelecionados.filter((nomeId) => nomeId !== id));
    } else {
      setNomesSelecionados([...nomesSelecionados, id]);
    }
  };

  return (
    <div>
      <h2>Marcadores:</h2>
      <ul className="space-y-2">
        {nomes.map((nome) => (
          <li key={nome.id} className="flex items-center">
            <button
              onClick={() => alterarNomesSelecionados(nome.id)}
              className="text-gray-600 hover:text-gray-800"
            >
              {nomesSelecionados.includes(nome.id) ? (
                <RiCheckboxFill />
              ) : (
                <RiCheckboxBlankLine />
              )}
            </button>
            <span className="ml-2">{nome.nome}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListarTags;
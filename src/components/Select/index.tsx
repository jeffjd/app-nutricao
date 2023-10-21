import React, { useEffect, useState } from 'react';
import { Input } from '..';

interface AutoCompleteInputProps {
  name: string;
  options: any[];
  value: any[];
  setFieldValue: (name: string, value: any) => void;
}

const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({
  options,
  value,
  name,
  setFieldValue,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<any[]>([]);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const filtered = options.filter((option) =>
      option.nome.toLowerCase().includes(value.toLowerCase()),
    );

    setFilteredOptions(filtered);

    setShowOptions(!!value);
  };

  const selectOption = (option: string) => {
    setInputValue('');
    const newArray = [...value, option];
    setFieldValue(name, newArray);
    setShowOptions(false);
    setFilteredOptions(options);
  };

  function searchItem(objA: any) {
    return value.some((objB) => objB.id === objA.id);
  }

  return (
    <div onMouseLeave={() => setShowOptions(false)}>
      <Input
        label="Ingredientes"
        placeholder="Procurar ingrediente..."
        value={inputValue}
        onClick={() => setShowOptions(true)}
        onChange={handleInputChange}
      />
      <div className="relative">
        {showOptions ? (
          <ul className="absolute z-10 bg-white w-full rounded-md drop-shadow">
            {Array.isArray(filteredOptions) &&
              filteredOptions.map((option: any) => {
                const hasSelect = searchItem(option);

                return (
                  <li
                    key={option.id}
                    onClick={() =>
                      !hasSelect ? selectOption(option) : undefined
                    }
                    className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                      hasSelect ? 'bg-slate-300 hover:bg-slate-300' : ''
                    }`}
                  >
                    {option.nome}
                  </li>
                );
              })}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default AutoCompleteInput;

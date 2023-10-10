import React, { useState } from "react";

interface AutoCompleteInputProps {
  options: string[];
  selectedOptions: string[];
  changeSelectedOptions: (option: string[]) => void;
}

const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({ options, selectedOptions, changeSelectedOptions }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const filtered = options.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);

    setShowOptions(!!value);
  };

  const selectOption = (option: string) => {
    setInputValue(option);
    changeSelectedOptions(selectedOptions.concat(option));
    setShowOptions(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Digite algo..."
        value={inputValue}
        onChange={handleInputChange}
        className="w-full border border-gray-300 rounded-md py-2 px-4"
      />
      {showOptions && filteredOptions.length > 0 && (
        <ul className="block w-full rounded-md border py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none">
          {filteredOptions.map((option) => (
            <li
              key={option}
              onClick={() => selectOption(option)}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoCompleteInput;
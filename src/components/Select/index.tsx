'use client';

import React, { Fragment, useEffect, useId, useState } from 'react';
import { Input } from '..';
import { Listbox, Transition } from '@headlessui/react';
import { FaAngleDown, FaCheck } from 'react-icons/fa6';
import { IOptions } from '@/helper/interface';

interface AutoCompleteInputProps {
  name: string;
  options: any[];
  value: any[];
  label: string;
  setFieldValue: (name: string, value: any) => void;
}

interface SelectProps {
  name: string;
  label: string;
  options: any[];
  value: IOptions | null;
  setFieldValue: (name: string, value: any) => void;
}

const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({
  options,
  value,
  name,
  label,
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
        label={label}
        type="text"
        placeholder={`Procurar ${label.toLowerCase()}...`}
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

const Select: React.FC<SelectProps> = ({
  name,
  label,
  options,
  setFieldValue,
  value,
}) => {
  const id = useId();
  return (
    <Listbox value={value} onChange={(value) => setFieldValue(name, value)}>
      <div className="relative">
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
        <Listbox.Button
          id={id}
          className="relative h-9 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
        >
          <span className="block truncate text-left">{value?.label}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <FaAngleDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((item, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                  }`
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {item.label}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <FaCheck className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export { AutoCompleteInput, Select };
'use client';

import { Dispatch, SetStateAction } from 'react';

export const handleIMC = (
  peso: string,
  altura: string,
  setInfo: Dispatch<SetStateAction<string>>,
  setFieldValue: (name: string, value: string) => void,
): void => {
  if (peso !== '' && altura !== '') {
    const pesoFloat = parseFloat(peso.replace(',', '.'));
    const alturaFloat = parseFloat(altura.replace(',', '.'));

    if (isNaN(pesoFloat) || isNaN(alturaFloat) || alturaFloat === 0) {
      setInfo('Por favor, insira valores válidos.');
      return;
    }

    const imc = pesoFloat / Math.pow(alturaFloat, 2);

    let classificacao = '';
    if (imc < 18.5) {
      classificacao = 'Abaixo do peso';
    } else if (imc < 24.9) {
      classificacao = 'Peso normal';
    } else if (imc < 29.9) {
      classificacao = 'Sobrepeso';
    } else {
      classificacao = 'Obesidade';
    }

    // Define o resultado
    setInfo(`O IMC do paciente é ${imc.toFixed(2)} - ${classificacao}`);
    setFieldValue('imc', imc.toFixed(2));
  }
};
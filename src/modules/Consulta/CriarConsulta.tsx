'use client';

import { FormikHelpers, useFormik } from 'formik';
import { Button, Input } from '../../components';
import { toast } from 'react-toastify';
import VMasker from 'vanilla-masker';
import { Dispatch, SetStateAction, useState } from 'react';
import Spinner from '@/components/Spinner';

interface IInitialValues {
  peso: string;
  altura: string;
  imc: string;
}

interface CriarConsultaProps {
  paciente: any;
  nextStep: Dispatch<SetStateAction<number>>;
}

const CriarConsulta: React.FC<CriarConsultaProps> = ({
  paciente,
  nextStep,
}) => {
  const [resultado, setResultado] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const initialValues: IInitialValues = {
    peso: '',
    altura: '',
    imc: '',
  };

  const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues,
    onSubmit: async (values, formikHelpers: FormikHelpers<IInitialValues>) => {
      setLoading(true);
      try {
        const response = await fetch(`/api/consulta`, {
          method: 'POST',
          body: JSON.stringify({ ...values, pacienteId: paciente.id }),
        });
        const { ok, msg } = await response.json();
        if (ok) {
          toast.success(msg);
          formikHelpers.resetForm({ values: initialValues });
          setResultado('');
          nextStep(1);
        } else toast.warning(msg);
      } catch (error) {
        toast.warning('Falha no cadastro');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      {loading ? <Spinner /> : null}
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 relative">
            Criar nova consulta
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Peso"
              name="peso"
              type="text"
              icon="KG"
              value={values.peso}
              onChange={(event) => {
                setFieldValue(
                  'peso',
                  VMasker.toPattern(event.target.value, '999'),
                );
              }}
              onMouseLeave={() => {
                if (values.peso !== '' && values.altura !== '') {
                  const pesoFloat = parseFloat(values.peso.replace(',', '.'));
                  const alturaFloat = parseFloat(
                    values.altura.replace(',', '.'),
                  );

                  if (
                    isNaN(pesoFloat) ||
                    isNaN(alturaFloat) ||
                    alturaFloat === 0
                  ) {
                    setResultado('Por favor, insira valores válidos.');
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

                  setResultado(
                    `O peso do paciente é ${imc.toFixed(2)} - ${classificacao}`,
                  );
                  setFieldValue('imc', imc.toFixed(2));
                }
              }}
            />
            <Input
              label="Altura"
              name="altura"
              type="text"
              icon="M"
              value={values.altura}
              onChange={(event) => {
                setFieldValue(
                  'altura',
                  VMasker.toPattern(event.target.value, '9,99'),
                );
              }}
              onMouseLeave={() => {
                if (values.peso !== '' && values.altura !== '') {
                  const pesoFloat = parseFloat(values.peso.replace(',', '.'));
                  const alturaFloat = parseFloat(
                    values.altura.replace(',', '.'),
                  );

                  if (
                    isNaN(pesoFloat) ||
                    isNaN(alturaFloat) ||
                    alturaFloat === 0
                  ) {
                    setResultado('Por favor, insira valores válidos.');
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
                  setResultado(
                    `O peso do paciente é ${imc.toFixed(2)} - ${classificacao}`,
                  );
                  setFieldValue('imc', imc.toFixed(2));
                }
              }}
            />
            <Input
              readOnly
              label="IMC"
              name="imc"
              type="text"
              value={values.imc}
              onChange={handleChange}
            />
            {resultado ? (
              <p className="mt-3 border-2 p-4 rounded-md border-blue-700 text-center font-semibold bg-blue-500 text-blue-700">
                {resultado}
              </p>
            ) : null}

            <div>
              <Button type="submit">Criar consulta</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CriarConsulta;

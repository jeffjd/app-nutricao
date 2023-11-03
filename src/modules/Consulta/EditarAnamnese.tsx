'use client';

import { FormikHelpers, useFormik } from 'formik';
import { Button, Input, Modal } from '../../components';
import { toast } from 'react-toastify';
import VMasker from 'vanilla-masker';
import { useState } from 'react';
import Spinner from '@/components/Spinner';
import { IAnamnese } from '@/helper/interface';
import { formatData } from '@/util/formatDate';

interface IInitialValues {
  peso: string;
  altura: string;
  imc: string;
  meta: string;
}

interface EditarAnamneseProps {
  anamnese: IAnamnese;
}

const EditarAnamnese: React.FC<EditarAnamneseProps> = ({ anamnese }) => {
  const [open, setOpen] = useState<boolean>(false);

  //   const initialValues: IInitialValues = {
  //     peso: '',
  //     altura: '',
  //     imc: '',
  //     meta: '',
  //   };

  //   const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
  //     initialValues,
  //     onSubmit: async (values, formikHelpers: FormikHelpers<IInitialValues>) => {
  //       setLoading(true);
  //       try {
  //         const response = await fetch(`/api/anamnese`, {
  //           method: 'POST',
  //           body: JSON.stringify({ ...values, pacienteId }),
  //         });
  //         const { ok, msg } = await response.json();
  //         if (ok) {
  //           toast.success(msg);
  //           formikHelpers.resetForm({ values: initialValues });
  //           setResultado('');
  //           refreshCahe();
  //           setOpen(false);
  //         } else toast.warning(msg);
  //       } catch (error) {
  //         toast.warning('Falha no cadastro');
  //       } finally {
  //         setLoading(false);
  //       }
  //     },
  //   });

  const handleOpenModal = (): void => {
    setOpen(!open);
  };

  //   const handleIMC = (): void => {
  //     if (values.peso !== '' && values.altura !== '') {
  //       const pesoFloat = parseFloat(values.peso.replace(',', '.'));
  //       const alturaFloat = parseFloat(values.altura.replace(',', '.'));

  //       if (isNaN(pesoFloat) || isNaN(alturaFloat) || alturaFloat === 0) {
  //         setResultado('Por favor, insira valores válidos.');
  //         return;
  //       }

  //       const imc = pesoFloat / Math.pow(alturaFloat, 2);

  //       let classificacao = '';
  //       if (imc < 18.5) {
  //         classificacao = 'Abaixo do peso';
  //       } else if (imc < 24.9) {
  //         classificacao = 'Peso normal';
  //       } else if (imc < 29.9) {
  //         classificacao = 'Sobrepeso';
  //       } else {
  //         classificacao = 'Obesidade';
  //       }

  //       // Define o resultado
  //       setResultado(`Seu IMC é ${imc.toFixed(2)} - ${classificacao}`);
  //       setFieldValue('imc', imc.toFixed(2));
  //     }
  //   };

  return (
    <>
      <Button
        type="button"
        model="outline"
        className="!w-fit"
        onClick={handleOpenModal}
      >
        Consultar Anamnese
      </Button>
      <Modal title="Anamnese" isOpen={open} onClose={handleOpenModal}>
        <div>
          <p>
            <strong className="mr-1">Peso:</strong>
            {anamnese.peso} kg
          </p>
          <p>
            <strong className="mr-1">Altura:</strong>
            {anamnese.altura} m
          </p>
          <p>
            <strong className="mr-1">IMC:</strong>
            {anamnese.imc}
          </p>
          <p>
            <strong className="mr-1">Meta:</strong>
            {anamnese.meta}
          </p>
          <p>
            <strong className="mr-1"> Atualizado em:</strong>
            {formatData(anamnese.updatedAt)}
          </p>
          <p className="whitespace-pre-line">
            <strong className="mr-1">Observação:</strong>
            <br />
            {anamnese.observacao}
          </p>
        </div>
        {/* <form className=" flex flex-col gap-3" onSubmit={handleSubmit}>
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
            onMouseLeave={handleIMC}
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
            onMouseLeave={handleIMC}
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
          <Input
            label="Meta"
            name="meta"
            placeholder="Objetivo do paciente..."
            type="text"
            value={values.meta}
            onChange={handleChange}
          />
          <div>
            <Button type="submit">Cadastrar</Button>
          </div>
        </form> */}
      </Modal>
    </>
  );
};

export default EditarAnamnese;
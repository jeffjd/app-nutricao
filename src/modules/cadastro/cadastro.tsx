'use client';

import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";

const Cadastro: React.FC = () => {
    const [tipodepaciente, setTipodepaciente] = useState<string | null>(null);
    const initialValues = {
        email: '',
        nome: '',
        senha: '',
    }
    const{values, handleSubmit, handleChange} = useFormik({
        initialValues,
        onSubmit: async (values) => {
            try{
                const response = await fetch('/api/user', {
                    method: 'POST',
                    body: JSON.stringify({...values, tipodepaciente}),
                })
                const data = await response.json();
                toast.success(data.message);
            } catch (error) {
                console.log(error);
            }
        }
    })

    return (
        <div>
            <h1>Cadastro</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input className="block" type="email" name="email" onChange={handleChange} value={values.email} />
                <input className="block" type="text" name="nome" onChange={handleChange} value={values.nome} />
                <input className="block" type="password" name="senha" onChange={handleChange} value={values.senha} />
                <div>
                    <button onClick={() => setTipodepaciente('paciente')} type="button">
                        Paciente
                    </button>
                    <button onClick={() => setTipodepaciente('nutricionista')} type="button">
                        Nutricionista
                    </button>
                </div>
                {tipodepaciente? <button type="submit">Enviar</button> : 'escolha o tipo de cadastro'}
                
            </form>
        </div>
    );
}

export default Cadastro
import Cadastro from '../../../modules/Cadastro/Cadastro';
import { redirect } from 'next/navigation';

type TType = 'paciente' | 'nutricionista';

export default function CadastroScreen({
  params,
}: {
  params: { type: TType };
}) {
  const { type } = params;

  if (!(type === 'paciente' || type === 'nutricionista')) redirect('/');

  return <Cadastro type={type} />;
}
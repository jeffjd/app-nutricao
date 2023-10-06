import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function PacienteScreen() {
  const cookieStore = cookies();
  const hasPaciente = cookieStore.get('auth');
  //   if(hasPaciente.type !== 'paciente') {
  //     redirect('/')
  //   }

  return <div>{hasPaciente ? hasPaciente.value : null}</div>;
}
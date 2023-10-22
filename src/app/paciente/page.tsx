import { cookies } from 'next/headers';
import Dashboard from '../../modules/Paciente/Dashboard';
import { redirect } from 'next/navigation';

export default function PacienteScreen() {
  const cookieStore = cookies();
  const auth = cookieStore.get('auth');
  let dataAuht;

  if (auth) {
    try {
      dataAuht = JSON.parse(auth.value);
    } catch (erro) {
      console.error('Erro ao converter a string para objeto:', erro);
    }
  } else {
    redirect('/');
  }

  return (
    <main>
      <Dashboard auth={dataAuht} />
    </main>
  );
}
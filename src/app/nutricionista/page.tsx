import { cookies } from 'next/headers';
import Dashboard from '../../modules/Nutricionista/Dashboard';

export default function NutricionistaScreen() {
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
    console.log('A string é vazia ou undefined. Não é possível converter.');
  }

  return (
    <main>
      <Dashboard auth={dataAuht} />
    </main>
  );
}

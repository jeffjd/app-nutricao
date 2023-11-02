import Consulta from '@/modules/Consulta';
import { getPacienteByNutricionistaId } from '@/server/paciente';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ConsultaScreen({
  params,
}: {
  params: { pacienteId: string };
}) {
  const { pacienteId } = params;

  const cookieStore = cookies();
  const auth = cookieStore.get('auth');
  let dataAuht;

  if (auth) {
    try {
      dataAuht = JSON.parse(auth.value);

      const { paciente } = await getPacienteByNutricionistaId(
        pacienteId,
        dataAuht.id,
      );

      if (!paciente) return redirect('/nutricionista');

      return (
        <main>
          <Consulta auth={dataAuht} paciente={paciente} />
        </main>
      );
    } catch (error) {
      return redirect('/');
    }
  } else {
    return redirect('/');
  }
}
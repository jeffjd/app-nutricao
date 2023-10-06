import PerfilNutricionista from '../../../modules/perfil/nutricionista/nutricionista';

const nutricionista = {
  nome: 'Doutor Trogodita',
};

export default function PerfilNutricionistaScreen() {
  return (
    <main>
      <PerfilNutricionista nutricionista={nutricionista} />
    </main>
  );
}

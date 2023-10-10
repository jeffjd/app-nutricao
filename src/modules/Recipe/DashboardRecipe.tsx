import { useState } from 'react';
import RecipeShowcase from './RecipeShowcase';
import RecipeCadastre from './RecipeCadastre';

const DashboardRecipe: React.FC = () => {
  const [nav, setNav] = useState<number>(0);

  const Context = () => {
    switch (nav) {
      case 0:
        return <RecipeShowcase />;
      case 1:
        return <RecipeCadastre />;
    }
  };
  return (
    <section>
      <nav className="max-w-6xl m-auto w-full flex">
        <div
          className={`py-4 px-6 font-semibold text-center w-full ${
            nav == 0 ? 'bg-azulescuro' : 'bg-slate-200'
          }`}
          onClick={() => setNav(0)}
        >
          Minhas receitas
        </div>

        <div
          className={`py-4 px-6 font-semibold text-center w-full ${
            nav == 1 ? 'bg-azulescuro' : 'bg-slate-200'
          }`}
          onClick={() => setNav(1)}
        >
          Criar receita
        </div>
      </nav>
      <Context />
    </section>
  );
};

export default DashboardRecipe;
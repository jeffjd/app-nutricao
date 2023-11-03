export interface IAnamnese {
    altura: string;
    id: string;
    imc: string;
    meta: string;
    observacao: string;
    pacienteId: string;
    peso: string;
    updatedAt: string;
  }
  
  export interface IOptions {
    label: string;
    value: string | number;
  }
  
  export interface IIngrediente {
    calorias: number;
    id: string;
    nome: string;
    unidade: string;
  }
  
  export interface IIngredientes {
    id: string;
    ingrediente: IIngrediente;
    ingredienteId: string;
    quantidade: number;
    receitaId: string;
  }
  
  export interface IReceita {
    id: string;
    nome: string;
    ingredientes: IIngredientes[];
  }
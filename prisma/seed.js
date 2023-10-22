const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const load = async () => {
  try {
    const ingredientes = await prisma.ingrediente.createMany({
      data: [
        { nome: 'Feijão', calorias: 42, unidade: 'colher' },
        { nome: 'Arroz', calorias: 40, unidade: 'colher' },
        { nome: 'Pão de forma', calorias: 40, unidade: 'porcao' },
        { nome: 'Café', calorias: 40, unidade: 'mililitros' },
        { nome: 'Banana', calorias: 40, unidade: 'porcao' },
        { nome: 'Frango Grelhado', calorias: 40, unidade: 'porcao' },
        { nome: 'Carne Assada', calorias: 40, unidade: 'porcao' },
      ],
    });
    const nutricionistas = await prisma.nutricionista.createMany({
      data: [
        {
          nome: 'Nutricionista 01',
          email: 'nutri01@email.com',
          senha: '123123',
        },
        {
          nome: 'Nutricionista 02',
          email: 'nutri@email.com',
          senha: '123123',
        },
      ],
    });
    console.log(ingredientes, nutricionistas);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
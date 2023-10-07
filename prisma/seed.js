const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const load = async () => {
  try {
    const ingredientes = await prisma.ingrediente.createMany({
      data: [
        { nome: 'Feijão', calorias: 42, unidade: 'colher' },
        { nome: 'Arroz', calorias: 40, unidade: 'colher' },
      ],
    });
    console.log(ingredientes);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
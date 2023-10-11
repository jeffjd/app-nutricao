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
    const pacientes = await prisma.paciente.createMany({
      data: [
        { nome: 'Paciente01', email: 'paciente01@email.com', senha: '123123' },
        { nome: 'Paciente02', email: 'paciente02@email.com', senha: '123123' },
      ],
    });
    const nutricionistas = await prisma.nutricionista.createMany({
      data: [
        {
          nome: 'Nutricionistas01',
          email: 'nutricionistas01@email.com',
          senha: '123123',
        },
        {
          nome: 'Nutricionistas02',
          email: 'nutricionistas02@email.com',
          senha: '123123',
        },
      ],
    });
    console.log(ingredientes, pacientes, nutricionistas);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
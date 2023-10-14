-- AlterTable
ALTER TABLE `paciente` ADD COLUMN `nutricionistaId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `ingrediente` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `calorias` INTEGER NOT NULL,
    `unidade` ENUM('colher', 'porcao', 'grama', 'kilograma', 'mililitros', 'litros') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `receita` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ingredienteQuantidade` (
    `id` VARCHAR(191) NOT NULL,
    `receitaId` VARCHAR(191) NULL,
    `ingredienteId` VARCHAR(191) NULL,
    `quantidade` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `paciente` ADD CONSTRAINT `paciente_nutricionistaId_fkey` FOREIGN KEY (`nutricionistaId`) REFERENCES `nutricionista`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ingredienteQuantidade` ADD CONSTRAINT `ingredienteQuantidade_receitaId_fkey` FOREIGN KEY (`receitaId`) REFERENCES `receita`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ingredienteQuantidade` ADD CONSTRAINT `ingredienteQuantidade_ingredienteId_fkey` FOREIGN KEY (`ingredienteId`) REFERENCES `ingrediente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

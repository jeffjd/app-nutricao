/*
  Warnings:

  - You are about to drop the column `altura` on the `consulta` table. All the data in the column will be lost.
  - You are about to drop the column `imc` on the `consulta` table. All the data in the column will be lost.
  - You are about to drop the column `peso` on the `consulta` table. All the data in the column will be lost.
  - Added the required column `pesoFinal` to the `consulta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pesoIncial` to the `consulta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pesoObjetivo` to the `consulta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `points` to the `consulta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `consulta` DROP COLUMN `altura`,
    DROP COLUMN `imc`,
    DROP COLUMN `peso`,
    ADD COLUMN `pesoFinal` DOUBLE NOT NULL,
    ADD COLUMN `pesoIncial` DOUBLE NOT NULL,
    ADD COLUMN `pesoObjetivo` DOUBLE NOT NULL,
    ADD COLUMN `points` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `anamnese` (
    `id` VARCHAR(191) NOT NULL,
    `peso` VARCHAR(191) NOT NULL,
    `altura` VARCHAR(191) NOT NULL,
    `imc` VARCHAR(191) NOT NULL,
    `meta` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `pacienteId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `anamnese_pacienteId_key`(`pacienteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `receitaConsulta` (
    `id` VARCHAR(191) NOT NULL,
    `receitaId` VARCHAR(191) NULL,
    `consultaId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `anamnese` ADD CONSTRAINT `anamnese_pacienteId_fkey` FOREIGN KEY (`pacienteId`) REFERENCES `paciente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `receitaConsulta` ADD CONSTRAINT `receitaConsulta_receitaId_fkey` FOREIGN KEY (`receitaId`) REFERENCES `receita`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `receitaConsulta` ADD CONSTRAINT `receitaConsulta_consultaId_fkey` FOREIGN KEY (`consultaId`) REFERENCES `consulta`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

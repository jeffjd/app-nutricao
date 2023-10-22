-- AlterTable
ALTER TABLE `consulta` ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE `receitaConsumida` (
    `id` VARCHAR(191) NOT NULL,
    `receitaConsultaId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `receitaConsumida` ADD CONSTRAINT `receitaConsumida_receitaConsultaId_fkey` FOREIGN KEY (`receitaConsultaId`) REFERENCES `receitaConsulta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

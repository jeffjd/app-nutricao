-- CreateTable
CREATE TABLE `consulta` (
    `id` VARCHAR(191) NOT NULL,
    `peso` VARCHAR(191) NOT NULL,
    `altura` VARCHAR(191) NOT NULL,
    `imc` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `pacienteId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `consulta` ADD CONSTRAINT `consulta_pacienteId_fkey` FOREIGN KEY (`pacienteId`) REFERENCES `paciente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

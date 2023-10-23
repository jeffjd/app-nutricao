-- AlterTable
ALTER TABLE `receita` ADD COLUMN `nutricionistaId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `receita` ADD CONSTRAINT `receita_nutricionistaId_fkey` FOREIGN KEY (`nutricionistaId`) REFERENCES `nutricionista`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

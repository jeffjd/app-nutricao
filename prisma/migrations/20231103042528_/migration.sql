/*
  Warnings:

  - Made the column `points` on table `consulta` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `consulta` ADD COLUMN `altura` VARCHAR(191) NULL,
    ADD COLUMN `imc` VARCHAR(191) NULL,
    MODIFY `points` INTEGER NOT NULL DEFAULT 0;

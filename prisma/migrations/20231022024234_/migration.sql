/*
  Warnings:

  - You are about to drop the column `pesoIncial` on the `consulta` table. All the data in the column will be lost.
  - Added the required column `pesoInicial` to the `consulta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `retorno` to the `consulta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `consulta` DROP COLUMN `pesoIncial`,
    ADD COLUMN `pesoInicial` DOUBLE NOT NULL,
    ADD COLUMN `retorno` INTEGER NOT NULL,
    MODIFY `pesoFinal` DOUBLE NULL,
    MODIFY `points` INTEGER NULL;

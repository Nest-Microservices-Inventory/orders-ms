/*
  Warnings:

  - You are about to alter the column `productPriceSale` on the `orderDetails` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Decimal(65,30)`.
  - You are about to drop the column `clienteLastName` on the `orders` table. All the data in the column will be lost.
  - Added the required column `clientLastName` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orderDetails` MODIFY `productPriceSale` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `clienteLastName`,
    ADD COLUMN `clientLastName` VARCHAR(191) NOT NULL;

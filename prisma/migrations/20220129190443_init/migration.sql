/*
  Warnings:

  - You are about to drop the column `college_Name` on the `college` table. All the data in the column will be lost.
  - Added the required column `college` to the `College` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `college` DROP COLUMN `college_Name`,
    ADD COLUMN `college` VARCHAR(191) NOT NULL;

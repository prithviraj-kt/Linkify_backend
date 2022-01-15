/*
  Warnings:

  - Added the required column `college` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` ADD COLUMN `college` VARCHAR(191) NOT NULL;

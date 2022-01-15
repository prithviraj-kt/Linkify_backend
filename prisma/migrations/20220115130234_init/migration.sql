/*
  Warnings:

  - Added the required column `username` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` ADD COLUMN `username` VARCHAR(191) NOT NULL;

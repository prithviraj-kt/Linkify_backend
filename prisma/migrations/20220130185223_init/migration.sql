/*
  Warnings:

  - You are about to drop the column `username` on the `login` table. All the data in the column will be lost.
  - You are about to drop the `college` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `position` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_name]` on the table `login` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_name` to the `login` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `login_username_key` ON `login`;

-- AlterTable
ALTER TABLE `login` DROP COLUMN `username`,
    ADD COLUMN `user_name` VARCHAR(30) NOT NULL;

-- DropTable
DROP TABLE `college`;

-- DropTable
DROP TABLE `position`;

-- CreateIndex
CREATE UNIQUE INDEX `login_user_name_key` ON `login`(`user_name`);

-- AddForeignKey
ALTER TABLE `login` ADD CONSTRAINT `login_user_name_fkey` FOREIGN KEY (`user_name`) REFERENCES `user`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE `College` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `college_Name` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Position` (
    `username` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Position_username_key`(`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

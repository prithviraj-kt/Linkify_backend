-- CreateTable
CREATE TABLE `login` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(30) NOT NULL,
    `pasword` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `login_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` CHAR(36) NOT NULL,
    `first_name` VARCHAR(191) NULL,
    `last_name` VARCHAR(191) NULL,
    `user_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `address` JSON NULL,
    `age` INTEGER NULL,
    `bio` VARCHAR(191) NULL,
    `picture` VARCHAR(191) NULL,
    `pronounce` VARCHAR(191) NULL,
    `years_of_exprience` INTEGER NULL,
    `profession` VARCHAR(191) NULL,
    `lastLogin_ip` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `verified_email` BOOLEAN NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_user_name_key`(`user_name`),
    UNIQUE INDEX `User_email_key`(`email`),
    INDEX `_IDX_UESR`(`user_name`, `email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecoveryData` (
    `id` CHAR(36) NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `RecoveryData_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OAuthToken` (
    `id` CHAR(36) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `oauth_id` VARCHAR(191) NOT NULL,
    `access_token` CHAR(100) NOT NULL,
    `refresh_token` CHAR(100) NULL,
    `id_token` TEXT NOT NULL,
    `expire_in` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `OAuthToken_user_id_key`(`user_id`),
    UNIQUE INDEX `OAuthToken_oauth_id_key`(`oauth_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmailLog` (
    `id` CHAR(36) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `recipient_email` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NULL,
    `body` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `EmailLog_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` CHAR(36) NOT NULL,
    `sid` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expiresAt` TIMESTAMP(6) NOT NULL,
    `data` JSON NOT NULL,

    UNIQUE INDEX `Session_sid_key`(`sid`),
    UNIQUE INDEX `Session_user_id_key`(`user_id`),
    INDEX `IDX_session_expire`(`expiresAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Otp` (
    `id` CHAR(36) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `otp` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expires_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Otp_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RecoveryData` ADD CONSTRAINT `RecoveryData_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OAuthToken` ADD CONSTRAINT `OAuthToken_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmailLog` ADD CONSTRAINT `EmailLog_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Otp` ADD CONSTRAINT `Otp_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

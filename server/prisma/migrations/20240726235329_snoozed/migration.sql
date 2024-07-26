-- CreateTable
CREATE TABLE `SnoozedThread` (
    `id` CHAR(36) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `thread_id` VARCHAR(191) NOT NULL,
    `snooze_until` DATETIME(3) NOT NULL,
    `status` ENUM('pending', 'notified') NOT NULL DEFAULT 'pending',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `SnoozedThread_thread_id_key`(`thread_id`),
    INDEX `IDX_snoozed_thread`(`snooze_until`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `IDX_otp_expires_at` ON `Otp`(`expires_at`);

-- AddForeignKey
ALTER TABLE `SnoozedThread` ADD CONSTRAINT `SnoozedThread_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

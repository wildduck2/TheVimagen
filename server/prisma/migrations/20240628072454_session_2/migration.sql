/*
  Warnings:

  - You are about to drop the column `expires_at` on the `Session` table. All the data in the column will be lost.
  - Added the required column `expiresAt` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `IDX_session_expire` ON `Session`;

-- AlterTable
ALTER TABLE `Session` DROP COLUMN `expires_at`,
    ADD COLUMN `expiresAt` TIMESTAMP(6) NOT NULL;

-- CreateIndex
CREATE INDEX `IDX_session_expire` ON `Session`(`expiresAt`);

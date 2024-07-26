-- AlterTable
ALTER TABLE `OAuthToken` MODIFY `access_token` CHAR(255) NOT NULL,
    MODIFY `refresh_token` CHAR(255) NULL;


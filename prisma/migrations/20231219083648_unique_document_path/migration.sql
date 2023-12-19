/*
  Warnings:

  - A unique constraint covering the columns `[path]` on the table `Document` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `path` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Document` ADD COLUMN `path` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `path` ON `Document`(`path`);

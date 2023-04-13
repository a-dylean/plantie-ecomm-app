/*
  Warnings:

  - Made the column `user_id` on table `order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "order" ALTER COLUMN "user_id" SET NOT NULL,
ALTER COLUMN "created_at" DROP NOT NULL;

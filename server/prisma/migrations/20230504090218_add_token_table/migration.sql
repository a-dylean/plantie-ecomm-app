/*
  Warnings:

  - You are about to drop the column `verificationCode` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `user` table. All the data in the column will be lost.
  - Added the required column `price` to the `product_order` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "user_email_verificationCode_idx";

-- DropIndex
DROP INDEX "user_email_verificationCode_key";

-- DropIndex
DROP INDEX "user_verificationCode_key";

-- AlterTable
ALTER TABLE "order" ALTER COLUMN "status" SET DEFAULT 'Draft';

-- AlterTable
ALTER TABLE "product_order" ADD COLUMN     "price" MONEY NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "verificationCode",
DROP COLUMN "verified",
ADD COLUMN     "full_profile" BOOLEAN DEFAULT false,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;

-- CreateTable
CREATE TABLE "token" (
    "id" SERIAL NOT NULL,
    "token" VARCHAR(512),
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "token_user_id_key" ON "token"("user_id");

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `category_id` on the `product` table. All the data in the column will be lost.
  - Added the required column `category_name` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_category_id_fkey";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "category_id",
ADD COLUMN     "category_name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_category_name_fkey" FOREIGN KEY ("category_name") REFERENCES "category"("category_name") ON DELETE NO ACTION ON UPDATE NO ACTION;

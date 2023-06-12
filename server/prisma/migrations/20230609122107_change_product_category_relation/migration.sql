/*
  Warnings:

  - Made the column `category_name` on table `category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `category_id` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_category_id_fkey";

-- AlterTable
ALTER TABLE "category" ALTER COLUMN "category_name" SET NOT NULL;

-- AlterTable
ALTER TABLE "product" ALTER COLUMN "category_id" SET NOT NULL,
ALTER COLUMN "category_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("category_name") ON DELETE NO ACTION ON UPDATE NO ACTION;

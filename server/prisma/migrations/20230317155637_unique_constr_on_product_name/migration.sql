/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "products" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "price" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "products_name_key" ON "products"("name");

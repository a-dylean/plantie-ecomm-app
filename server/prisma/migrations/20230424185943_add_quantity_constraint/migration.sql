/*
  Warnings:

  - Made the column `quantity` on table `product_order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "product_order" ALTER COLUMN "quantity" SET NOT NULL,
ALTER COLUMN "quantity" SET DEFAULT 0;

ALTER TABLE "product_order" ADD CONSTRAINT "positive_quantity" CHECK ("quantity" >= 0);
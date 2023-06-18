-- AlterTable
ALTER TABLE "product_order" ADD COLUMN     "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(6);

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "stripeId" VARCHAR(256);

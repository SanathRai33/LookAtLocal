/*
  Warnings:

  - You are about to drop the column `address` on the `emergency_requests` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `job_listings` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `product_listings` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `rental_listings` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `service_listings` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `space_listings` table. All the data in the column will be lost.
  - Added the required column `state` to the `job_listings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `product_listings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `rental_listings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `service_listings` table without a default value. This is not possible if the table is not empty.
  - Made the column `state` on table `space_listings` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "emergency_requests" DROP COLUMN "address",
ADD COLUMN     "address_line" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "locality" TEXT,
ADD COLUMN     "postal_code" TEXT,
ADD COLUMN     "state" TEXT;

-- AlterTable
ALTER TABLE "job_listings" DROP COLUMN "address",
ADD COLUMN     "address_line" TEXT,
ADD COLUMN     "locality" TEXT,
ADD COLUMN     "postal_code" TEXT,
ADD COLUMN     "state" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "product_listings" DROP COLUMN "address",
ADD COLUMN     "address_line" TEXT,
ADD COLUMN     "locality" TEXT,
ADD COLUMN     "postal_code" TEXT,
ADD COLUMN     "state" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "rental_listings" DROP COLUMN "address",
ADD COLUMN     "address_line" TEXT,
ADD COLUMN     "locality" TEXT,
ADD COLUMN     "postal_code" TEXT,
ADD COLUMN     "state" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "service_listings" DROP COLUMN "address",
ADD COLUMN     "address_line" TEXT,
ADD COLUMN     "locality" TEXT,
ADD COLUMN     "postal_code" TEXT,
ADD COLUMN     "rejection_reason" TEXT,
ADD COLUMN     "reviewed_at" TIMESTAMP(3),
ADD COLUMN     "reviewed_by" UUID,
ADD COLUMN     "state" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "space_listings" DROP COLUMN "address",
ADD COLUMN     "address_line" TEXT,
ADD COLUMN     "locality" TEXT,
ALTER COLUMN "state" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "address_line" TEXT,
ADD COLUMN     "locality" TEXT;

-- CreateTable
CREATE TABLE "password_reset_tokens" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "token_hash" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "used_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "password_reset_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_tokens_token_hash_key" ON "password_reset_tokens"("token_hash");

-- CreateIndex
CREATE INDEX "password_reset_tokens_user_id_idx" ON "password_reset_tokens"("user_id");

-- CreateIndex
CREATE INDEX "password_reset_tokens_expires_at_idx" ON "password_reset_tokens"("expires_at");

-- CreateIndex
CREATE INDEX "service_listings_postal_code_idx" ON "service_listings"("postal_code");

-- CreateIndex
CREATE INDEX "service_listings_reviewed_by_idx" ON "service_listings"("reviewed_by");

-- CreateIndex
CREATE INDEX "users_postal_code_idx" ON "users"("postal_code");

-- AddForeignKey
ALTER TABLE "service_listings" ADD CONSTRAINT "service_listings_reviewed_by_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

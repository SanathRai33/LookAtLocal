/*
  Warnings:

  - A unique constraint covering the columns `[reviewer_id,entity_type,transaction_id]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `transaction_id` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "transaction_id" UUID NOT NULL;

-- CreateIndex
CREATE INDEX "reviews_entity_type_transaction_id_idx" ON "reviews"("entity_type", "transaction_id");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_reviewer_id_entity_type_transaction_id_key" ON "reviews"("reviewer_id", "entity_type", "transaction_id");

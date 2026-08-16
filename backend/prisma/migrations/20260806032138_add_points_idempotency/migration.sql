/*
  Warnings:

  - A unique constraint covering the columns `[user_id,action_type,reference_type,reference_id]` on the table `points_transactions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "points_transactions_user_id_action_type_reference_type_refe_key" ON "points_transactions"("user_id", "action_type", "reference_type", "reference_id");

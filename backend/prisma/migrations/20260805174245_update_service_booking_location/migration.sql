/*
  Warnings:

  - You are about to drop the column `address` on the `service_bookings` table. All the data in the column will be lost.
  - Added the required column `address_line` to the `service_bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `service_bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `service_bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "service_bookings" DROP COLUMN "address",
ADD COLUMN     "address_line" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "locality" TEXT,
ADD COLUMN     "postal_code" TEXT,
ADD COLUMN     "state" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "service_bookings_city_idx" ON "service_bookings"("city");

-- CreateIndex
CREATE INDEX "service_bookings_postal_code_idx" ON "service_bookings"("postal_code");

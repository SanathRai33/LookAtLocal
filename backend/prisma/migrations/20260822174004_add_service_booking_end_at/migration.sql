-- AlterTable
ALTER TABLE "service_bookings" ADD COLUMN     "end_at" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "service_bookings_service_id_status_scheduled_at_idx" ON "service_bookings"("service_id", "status", "scheduled_at");

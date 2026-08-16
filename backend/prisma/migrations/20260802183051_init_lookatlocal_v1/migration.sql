-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'BANNED', 'DEACTIVATED');

-- CreateEnum
CREATE TYPE "CategoryModule" AS ENUM ('SERVICE', 'RENTAL', 'PRODUCT', 'SPACE', 'JOB');

-- CreateEnum
CREATE TYPE "PricingType" AS ENUM ('HOURLY', 'DAILY', 'FIXED');

-- CreateEnum
CREATE TYPE "ServiceListingStatus" AS ENUM ('DRAFT', 'PENDING', 'ACTIVE', 'REJECTED', 'CLOSED');

-- CreateEnum
CREATE TYPE "ServiceBookingStatus" AS ENUM ('REQUESTED', 'ACCEPTED', 'REJECTED', 'CANCELLED', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "ItemCondition" AS ENUM ('NEW', 'LIKE_NEW', 'GOOD', 'FAIR', 'POOR');

-- CreateEnum
CREATE TYPE "RentalDeliveryOption" AS ENUM ('PICKUP', 'OWNER_DELIVERY', 'BOTH');

-- CreateEnum
CREATE TYPE "RentalListingStatus" AS ENUM ('DRAFT', 'PENDING', 'ACTIVE', 'REJECTED', 'CLOSED');

-- CreateEnum
CREATE TYPE "RentalBookingStatus" AS ENUM ('REQUESTED', 'ACCEPTED', 'REJECTED', 'CANCELLED', 'ACTIVE', 'COMPLETED');

-- CreateEnum
CREATE TYPE "ProductDeliveryOption" AS ENUM ('PICKUP', 'SELLER_DELIVERY', 'BOTH');

-- CreateEnum
CREATE TYPE "ProductListingStatus" AS ENUM ('DRAFT', 'PENDING', 'ACTIVE', 'RESERVED', 'SOLD', 'REJECTED', 'CLOSED');

-- CreateEnum
CREATE TYPE "ProductTransactionStatus" AS ENUM ('REQUESTED', 'ACCEPTED', 'CANCELLED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "SpaceType" AS ENUM ('SHOP', 'OFFICE', 'ROOM', 'PG', 'WAREHOUSE', 'PARKING');

-- CreateEnum
CREATE TYPE "SpaceListingStatus" AS ENUM ('DRAFT', 'PENDING', 'ACTIVE', 'REJECTED', 'CLOSED');

-- CreateEnum
CREATE TYPE "SpacePricingType" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY');

-- CreateEnum
CREATE TYPE "SpaceUnitStatus" AS ENUM ('AVAILABLE', 'RESERVED', 'OCCUPIED');

-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'DAILY_WAGE');

-- CreateEnum
CREATE TYPE "SalaryType" AS ENUM ('HOURLY', 'DAILY', 'MONTHLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "JobListingStatus" AS ENUM ('DRAFT', 'PENDING', 'ACTIVE', 'CLOSED', 'REJECTED');

-- CreateEnum
CREATE TYPE "JobApplicationStatus" AS ENUM ('APPLIED', 'REVIEWING', 'SHORTLISTED', 'ACCEPTED', 'REJECTED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "EmergencyType" AS ENUM ('BLOOD', 'MEDICAL', 'ACCIDENT', 'VOLUNTEER', 'OTHER');

-- CreateEnum
CREATE TYPE "EmergencyUrgency" AS ENUM ('NORMAL', 'URGENT', 'CRITICAL');

-- CreateEnum
CREATE TYPE "EmergencyRequestStatus" AS ENUM ('ACTIVE', 'RESOLVED', 'CANCELLED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "EmergencyResponseStatus" AS ENUM ('OFFERED', 'ACCEPTED', 'DECLINED', 'WITHDRAWN', 'COMPLETED');

-- CreateEnum
CREATE TYPE "CommunityPostType" AS ENUM ('EVENT', 'ANNOUNCEMENT', 'LOST_FOUND', 'ALERT', 'GENERAL');

-- CreateEnum
CREATE TYPE "CommunityPostStatus" AS ENUM ('PENDING', 'ACTIVE', 'REJECTED', 'CLOSED');

-- CreateEnum
CREATE TYPE "ListingImageEntityType" AS ENUM ('SERVICE', 'RENTAL', 'PRODUCT', 'SPACE', 'COMMUNITY');

-- CreateEnum
CREATE TYPE "FavoriteEntityType" AS ENUM ('SERVICE', 'RENTAL', 'PRODUCT', 'SPACE', 'JOB', 'COMMUNITY');

-- CreateEnum
CREATE TYPE "ReviewEntityType" AS ENUM ('SERVICE', 'RENTAL');

-- CreateEnum
CREATE TYPE "ReportEntityType" AS ENUM ('USER', 'SERVICE', 'RENTAL', 'PRODUCT', 'SPACE', 'JOB', 'EMERGENCY', 'COMMUNITY');

-- CreateEnum
CREATE TYPE "ReportReason" AS ENUM ('SPAM', 'FRAUD', 'DUPLICATE', 'INAPPROPRIATE', 'MISLEADING', 'OTHER');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('OPEN', 'REVIEWING', 'RESOLVED', 'DISMISSED');

-- CreateEnum
CREATE TYPE "PointsTransactionType" AS ENUM ('EARNED', 'REDEEMED', 'ADJUSTED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "PointsActionType" AS ENUM ('SERVICE_COMPLETED', 'RENTAL_COMPLETED', 'PRODUCT_SOLD', 'JOB_COMPLETED', 'EMERGENCY_HELP', 'COMMUNITY_CONTRIBUTION', 'ADMIN_ADJUSTMENT');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "password_hash" TEXT NOT NULL,
    "profile_image_url" TEXT,
    "bio" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "status_reason" TEXT,
    "status_changed_by" UUID,
    "status_changed_at" TIMESTAMP(3),
    "is_email_verified" BOOLEAN NOT NULL DEFAULT false,
    "is_phone_verified" BOOLEAN NOT NULL DEFAULT false,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "city" TEXT,
    "state" TEXT,
    "postal_code" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT,
    "module" "CategoryModule" NOT NULL,
    "parent_id" UUID,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_listings" (
    "id" UUID NOT NULL,
    "provider_id" UUID NOT NULL,
    "category_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "experience_years" INTEGER,
    "pricing_type" "PricingType" NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "is_negotiable" BOOLEAN NOT NULL DEFAULT false,
    "is_available" BOOLEAN NOT NULL DEFAULT true,
    "address" TEXT,
    "city" TEXT NOT NULL,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "status" "ServiceListingStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "service_listings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_bookings" (
    "id" UUID NOT NULL,
    "service_id" UUID NOT NULL,
    "customer_id" UUID NOT NULL,
    "scheduled_at" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "customer_note" TEXT,
    "agreed_price" DECIMAL(10,2),
    "status" "ServiceBookingStatus" NOT NULL DEFAULT 'REQUESTED',
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rental_listings" (
    "id" UUID NOT NULL,
    "owner_id" UUID NOT NULL,
    "category_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price_per_day" DECIMAL(10,2) NOT NULL,
    "deposit_amount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "is_negotiable" BOOLEAN NOT NULL DEFAULT false,
    "condition" "ItemCondition" NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "delivery_option" "RentalDeliveryOption" NOT NULL,
    "address" TEXT,
    "city" TEXT NOT NULL,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "is_available" BOOLEAN NOT NULL DEFAULT true,
    "status" "RentalListingStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "rental_listings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rental_bookings" (
    "id" UUID NOT NULL,
    "rental_id" UUID NOT NULL,
    "renter_id" UUID NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price_per_day" DECIMAL(10,2) NOT NULL,
    "total_amount" DECIMAL(10,2) NOT NULL,
    "deposit_amount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "status" "RentalBookingStatus" NOT NULL DEFAULT 'REQUESTED',
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rental_bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_listings" (
    "id" UUID NOT NULL,
    "seller_id" UUID NOT NULL,
    "category_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "is_negotiable" BOOLEAN NOT NULL DEFAULT false,
    "condition" "ItemCondition" NOT NULL,
    "delivery_option" "ProductDeliveryOption" NOT NULL,
    "address" TEXT,
    "city" TEXT NOT NULL,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "status" "ProductListingStatus" NOT NULL DEFAULT 'PENDING',
    "sold_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "product_listings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_transactions" (
    "id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "seller_id" UUID NOT NULL,
    "buyer_id" UUID NOT NULL,
    "agreed_price" DECIMAL(10,2),
    "status" "ProductTransactionStatus" NOT NULL DEFAULT 'REQUESTED',
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "space_listings" (
    "id" UUID NOT NULL,
    "owner_id" UUID NOT NULL,
    "category_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "space_type" "SpaceType" NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT,
    "postal_code" TEXT,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "status" "SpaceListingStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "space_listings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "space_units" (
    "id" UUID NOT NULL,
    "space_listing_id" UUID NOT NULL,
    "unit_number" TEXT,
    "floor" TEXT,
    "area_sqft" DECIMAL(10,2),
    "pricing_type" "SpacePricingType" NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "deposit_amount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "available_from" TIMESTAMP(3),
    "status" "SpaceUnitStatus" NOT NULL DEFAULT 'AVAILABLE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "space_units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_listings" (
    "id" UUID NOT NULL,
    "posted_by" UUID NOT NULL,
    "category_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "job_type" "JobType" NOT NULL,
    "salary_min" DECIMAL(12,2),
    "salary_max" DECIMAL(12,2),
    "salary_type" "SalaryType",
    "benefits" TEXT,
    "experience_required" TEXT,
    "vacancies" INTEGER NOT NULL DEFAULT 1,
    "address" TEXT,
    "city" TEXT NOT NULL,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "application_deadline" TIMESTAMP(3),
    "status" "JobListingStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "job_listings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_applications" (
    "id" UUID NOT NULL,
    "job_id" UUID NOT NULL,
    "applicant_id" UUID NOT NULL,
    "message" TEXT,
    "resume_url" TEXT,
    "status" "JobApplicationStatus" NOT NULL DEFAULT 'APPLIED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emergency_requests" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "emergency_type" "EmergencyType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "urgency" "EmergencyUrgency" NOT NULL DEFAULT 'NORMAL',
    "address" TEXT NOT NULL,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "contact_phone" TEXT NOT NULL,
    "status" "EmergencyRequestStatus" NOT NULL DEFAULT 'ACTIVE',
    "expires_at" TIMESTAMP(3) NOT NULL,
    "resolved_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "emergency_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emergency_responses" (
    "id" UUID NOT NULL,
    "request_id" UUID NOT NULL,
    "responder_id" UUID NOT NULL,
    "message" TEXT,
    "status" "EmergencyResponseStatus" NOT NULL DEFAULT 'OFFERED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "emergency_responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "community_posts" (
    "id" UUID NOT NULL,
    "author_id" UUID NOT NULL,
    "post_type" "CommunityPostType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "starts_at" TIMESTAMP(3),
    "ends_at" TIMESTAMP(3),
    "location_name" TEXT,
    "address" TEXT,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "is_pinned" BOOLEAN NOT NULL DEFAULT false,
    "status" "CommunityPostStatus" NOT NULL DEFAULT 'PENDING',
    "expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "community_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_confirmations" (
    "id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_confirmations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listing_images" (
    "id" UUID NOT NULL,
    "entity_type" "ListingImageEntityType" NOT NULL,
    "entity_id" UUID NOT NULL,
    "image_url" TEXT NOT NULL,
    "public_id" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "listing_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorites" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "entity_type" "FavoriteEntityType" NOT NULL,
    "entity_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" UUID NOT NULL,
    "reviewer_id" UUID NOT NULL,
    "reviewee_id" UUID NOT NULL,
    "entity_type" "ReviewEntityType" NOT NULL,
    "entity_id" UUID NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reports" (
    "id" UUID NOT NULL,
    "reporter_id" UUID NOT NULL,
    "entity_type" "ReportEntityType" NOT NULL,
    "entity_id" UUID NOT NULL,
    "reason" "ReportReason" NOT NULL,
    "description" TEXT,
    "status" "ReportStatus" NOT NULL DEFAULT 'OPEN',
    "reviewed_by" UUID,
    "reviewed_at" TIMESTAMP(3),
    "resolution_note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "entity_type" TEXT,
    "entity_id" UUID,
    "read_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_audit_logs" (
    "id" UUID NOT NULL,
    "admin_id" UUID NOT NULL,
    "action" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" UUID,
    "old_data" JSONB,
    "new_data" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "points_transactions" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "points" INTEGER NOT NULL,
    "transaction_type" "PointsTransactionType" NOT NULL,
    "action_type" "PointsActionType" NOT NULL,
    "reference_type" TEXT,
    "reference_id" UUID,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "points_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE INDEX "users_status_idx" ON "users"("status");

-- CreateIndex
CREATE INDEX "users_city_idx" ON "users"("city");

-- CreateIndex
CREATE INDEX "users_created_at_idx" ON "users"("created_at");

-- CreateIndex
CREATE INDEX "categories_module_idx" ON "categories"("module");

-- CreateIndex
CREATE INDEX "categories_parent_id_idx" ON "categories"("parent_id");

-- CreateIndex
CREATE INDEX "categories_is_active_idx" ON "categories"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "categories_module_slug_key" ON "categories"("module", "slug");

-- CreateIndex
CREATE INDEX "service_listings_provider_id_idx" ON "service_listings"("provider_id");

-- CreateIndex
CREATE INDEX "service_listings_category_id_idx" ON "service_listings"("category_id");

-- CreateIndex
CREATE INDEX "service_listings_status_idx" ON "service_listings"("status");

-- CreateIndex
CREATE INDEX "service_listings_city_idx" ON "service_listings"("city");

-- CreateIndex
CREATE INDEX "service_listings_is_available_idx" ON "service_listings"("is_available");

-- CreateIndex
CREATE INDEX "service_listings_created_at_idx" ON "service_listings"("created_at");

-- CreateIndex
CREATE INDEX "service_bookings_service_id_idx" ON "service_bookings"("service_id");

-- CreateIndex
CREATE INDEX "service_bookings_customer_id_idx" ON "service_bookings"("customer_id");

-- CreateIndex
CREATE INDEX "service_bookings_status_idx" ON "service_bookings"("status");

-- CreateIndex
CREATE INDEX "service_bookings_scheduled_at_idx" ON "service_bookings"("scheduled_at");

-- CreateIndex
CREATE INDEX "rental_listings_owner_id_idx" ON "rental_listings"("owner_id");

-- CreateIndex
CREATE INDEX "rental_listings_category_id_idx" ON "rental_listings"("category_id");

-- CreateIndex
CREATE INDEX "rental_listings_status_idx" ON "rental_listings"("status");

-- CreateIndex
CREATE INDEX "rental_listings_city_idx" ON "rental_listings"("city");

-- CreateIndex
CREATE INDEX "rental_listings_is_available_idx" ON "rental_listings"("is_available");

-- CreateIndex
CREATE INDEX "rental_listings_created_at_idx" ON "rental_listings"("created_at");

-- CreateIndex
CREATE INDEX "rental_bookings_rental_id_idx" ON "rental_bookings"("rental_id");

-- CreateIndex
CREATE INDEX "rental_bookings_renter_id_idx" ON "rental_bookings"("renter_id");

-- CreateIndex
CREATE INDEX "rental_bookings_status_idx" ON "rental_bookings"("status");

-- CreateIndex
CREATE INDEX "rental_bookings_start_date_end_date_idx" ON "rental_bookings"("start_date", "end_date");

-- CreateIndex
CREATE INDEX "product_listings_seller_id_idx" ON "product_listings"("seller_id");

-- CreateIndex
CREATE INDEX "product_listings_category_id_idx" ON "product_listings"("category_id");

-- CreateIndex
CREATE INDEX "product_listings_status_idx" ON "product_listings"("status");

-- CreateIndex
CREATE INDEX "product_listings_city_idx" ON "product_listings"("city");

-- CreateIndex
CREATE INDEX "product_listings_created_at_idx" ON "product_listings"("created_at");

-- CreateIndex
CREATE INDEX "product_transactions_product_id_idx" ON "product_transactions"("product_id");

-- CreateIndex
CREATE INDEX "product_transactions_seller_id_idx" ON "product_transactions"("seller_id");

-- CreateIndex
CREATE INDEX "product_transactions_buyer_id_idx" ON "product_transactions"("buyer_id");

-- CreateIndex
CREATE INDEX "product_transactions_status_idx" ON "product_transactions"("status");

-- CreateIndex
CREATE INDEX "space_listings_owner_id_idx" ON "space_listings"("owner_id");

-- CreateIndex
CREATE INDEX "space_listings_category_id_idx" ON "space_listings"("category_id");

-- CreateIndex
CREATE INDEX "space_listings_space_type_idx" ON "space_listings"("space_type");

-- CreateIndex
CREATE INDEX "space_listings_status_idx" ON "space_listings"("status");

-- CreateIndex
CREATE INDEX "space_listings_city_idx" ON "space_listings"("city");

-- CreateIndex
CREATE INDEX "space_listings_created_at_idx" ON "space_listings"("created_at");

-- CreateIndex
CREATE INDEX "space_units_space_listing_id_idx" ON "space_units"("space_listing_id");

-- CreateIndex
CREATE INDEX "space_units_status_idx" ON "space_units"("status");

-- CreateIndex
CREATE INDEX "space_units_available_from_idx" ON "space_units"("available_from");

-- CreateIndex
CREATE INDEX "job_listings_posted_by_idx" ON "job_listings"("posted_by");

-- CreateIndex
CREATE INDEX "job_listings_category_id_idx" ON "job_listings"("category_id");

-- CreateIndex
CREATE INDEX "job_listings_job_type_idx" ON "job_listings"("job_type");

-- CreateIndex
CREATE INDEX "job_listings_status_idx" ON "job_listings"("status");

-- CreateIndex
CREATE INDEX "job_listings_city_idx" ON "job_listings"("city");

-- CreateIndex
CREATE INDEX "job_listings_application_deadline_idx" ON "job_listings"("application_deadline");

-- CreateIndex
CREATE INDEX "job_listings_created_at_idx" ON "job_listings"("created_at");

-- CreateIndex
CREATE INDEX "job_applications_applicant_id_idx" ON "job_applications"("applicant_id");

-- CreateIndex
CREATE INDEX "job_applications_status_idx" ON "job_applications"("status");

-- CreateIndex
CREATE UNIQUE INDEX "job_applications_job_id_applicant_id_key" ON "job_applications"("job_id", "applicant_id");

-- CreateIndex
CREATE INDEX "emergency_requests_user_id_idx" ON "emergency_requests"("user_id");

-- CreateIndex
CREATE INDEX "emergency_requests_emergency_type_idx" ON "emergency_requests"("emergency_type");

-- CreateIndex
CREATE INDEX "emergency_requests_urgency_idx" ON "emergency_requests"("urgency");

-- CreateIndex
CREATE INDEX "emergency_requests_status_idx" ON "emergency_requests"("status");

-- CreateIndex
CREATE INDEX "emergency_requests_expires_at_idx" ON "emergency_requests"("expires_at");

-- CreateIndex
CREATE INDEX "emergency_requests_created_at_idx" ON "emergency_requests"("created_at");

-- CreateIndex
CREATE INDEX "emergency_responses_responder_id_idx" ON "emergency_responses"("responder_id");

-- CreateIndex
CREATE INDEX "emergency_responses_status_idx" ON "emergency_responses"("status");

-- CreateIndex
CREATE UNIQUE INDEX "emergency_responses_request_id_responder_id_key" ON "emergency_responses"("request_id", "responder_id");

-- CreateIndex
CREATE INDEX "community_posts_author_id_idx" ON "community_posts"("author_id");

-- CreateIndex
CREATE INDEX "community_posts_post_type_idx" ON "community_posts"("post_type");

-- CreateIndex
CREATE INDEX "community_posts_status_idx" ON "community_posts"("status");

-- CreateIndex
CREATE INDEX "community_posts_starts_at_idx" ON "community_posts"("starts_at");

-- CreateIndex
CREATE INDEX "community_posts_expires_at_idx" ON "community_posts"("expires_at");

-- CreateIndex
CREATE INDEX "community_posts_created_at_idx" ON "community_posts"("created_at");

-- CreateIndex
CREATE INDEX "event_confirmations_user_id_idx" ON "event_confirmations"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "event_confirmations_post_id_user_id_key" ON "event_confirmations"("post_id", "user_id");

-- CreateIndex
CREATE INDEX "listing_images_entity_type_entity_id_idx" ON "listing_images"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "listing_images_entity_type_entity_id_sort_order_idx" ON "listing_images"("entity_type", "entity_id", "sort_order");

-- CreateIndex
CREATE INDEX "favorites_entity_type_entity_id_idx" ON "favorites"("entity_type", "entity_id");

-- CreateIndex
CREATE UNIQUE INDEX "favorites_user_id_entity_type_entity_id_key" ON "favorites"("user_id", "entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "reviews_reviewer_id_idx" ON "reviews"("reviewer_id");

-- CreateIndex
CREATE INDEX "reviews_reviewee_id_idx" ON "reviews"("reviewee_id");

-- CreateIndex
CREATE INDEX "reviews_entity_type_entity_id_idx" ON "reviews"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "reports_reporter_id_idx" ON "reports"("reporter_id");

-- CreateIndex
CREATE INDEX "reports_entity_type_entity_id_idx" ON "reports"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "reports_status_idx" ON "reports"("status");

-- CreateIndex
CREATE INDEX "reports_reviewed_by_idx" ON "reports"("reviewed_by");

-- CreateIndex
CREATE INDEX "reports_created_at_idx" ON "reports"("created_at");

-- CreateIndex
CREATE INDEX "notifications_user_id_idx" ON "notifications"("user_id");

-- CreateIndex
CREATE INDEX "notifications_user_id_read_at_idx" ON "notifications"("user_id", "read_at");

-- CreateIndex
CREATE INDEX "notifications_created_at_idx" ON "notifications"("created_at");

-- CreateIndex
CREATE INDEX "admin_audit_logs_admin_id_idx" ON "admin_audit_logs"("admin_id");

-- CreateIndex
CREATE INDEX "admin_audit_logs_entity_type_entity_id_idx" ON "admin_audit_logs"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "admin_audit_logs_created_at_idx" ON "admin_audit_logs"("created_at");

-- CreateIndex
CREATE INDEX "points_transactions_user_id_idx" ON "points_transactions"("user_id");

-- CreateIndex
CREATE INDEX "points_transactions_user_id_created_at_idx" ON "points_transactions"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "points_transactions_transaction_type_idx" ON "points_transactions"("transaction_type");

-- CreateIndex
CREATE INDEX "points_transactions_action_type_idx" ON "points_transactions"("action_type");

-- CreateIndex
CREATE INDEX "points_transactions_reference_type_reference_id_idx" ON "points_transactions"("reference_type", "reference_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_status_changed_by_fkey" FOREIGN KEY ("status_changed_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_listings" ADD CONSTRAINT "service_listings_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_listings" ADD CONSTRAINT "service_listings_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_bookings" ADD CONSTRAINT "service_bookings_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service_listings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_bookings" ADD CONSTRAINT "service_bookings_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental_listings" ADD CONSTRAINT "rental_listings_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental_listings" ADD CONSTRAINT "rental_listings_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental_bookings" ADD CONSTRAINT "rental_bookings_rental_id_fkey" FOREIGN KEY ("rental_id") REFERENCES "rental_listings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental_bookings" ADD CONSTRAINT "rental_bookings_renter_id_fkey" FOREIGN KEY ("renter_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_listings" ADD CONSTRAINT "product_listings_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_listings" ADD CONSTRAINT "product_listings_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_transactions" ADD CONSTRAINT "product_transactions_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product_listings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_transactions" ADD CONSTRAINT "product_transactions_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_transactions" ADD CONSTRAINT "product_transactions_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "space_listings" ADD CONSTRAINT "space_listings_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "space_listings" ADD CONSTRAINT "space_listings_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "space_units" ADD CONSTRAINT "space_units_space_listing_id_fkey" FOREIGN KEY ("space_listing_id") REFERENCES "space_listings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_listings" ADD CONSTRAINT "job_listings_posted_by_fkey" FOREIGN KEY ("posted_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_listings" ADD CONSTRAINT "job_listings_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "job_listings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emergency_requests" ADD CONSTRAINT "emergency_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emergency_responses" ADD CONSTRAINT "emergency_responses_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "emergency_requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emergency_responses" ADD CONSTRAINT "emergency_responses_responder_id_fkey" FOREIGN KEY ("responder_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "community_posts" ADD CONSTRAINT "community_posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_confirmations" ADD CONSTRAINT "event_confirmations_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "community_posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_confirmations" ADD CONSTRAINT "event_confirmations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_reviewee_id_fkey" FOREIGN KEY ("reviewee_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_reporter_id_fkey" FOREIGN KEY ("reporter_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_reviewed_by_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_audit_logs" ADD CONSTRAINT "admin_audit_logs_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "points_transactions" ADD CONSTRAINT "points_transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

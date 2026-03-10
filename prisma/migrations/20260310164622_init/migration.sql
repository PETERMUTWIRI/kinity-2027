-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" VARCHAR(500),
    "category" VARCHAR(100) NOT NULL,
    "cover" VARCHAR(500),
    "published" BOOLEAN NOT NULL DEFAULT true,
    "publishedAt" TIMESTAMP(3),
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "featuredQuote" TEXT,
    "isPressRelease" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "author" VARCHAR(255),
    "deletedAt" TIMESTAMP(6),
    "metaTitle" VARCHAR(100),
    "metaDesc" VARCHAR(160),
    "ogImage" VARCHAR(500),

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "category" VARCHAR(50) NOT NULL,
    "cover" VARCHAR(500),
    "location" VARCHAR(255) NOT NULL,
    "county" VARCHAR(100),
    "venue" VARCHAR(255),
    "address" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "securityLevel" TEXT NOT NULL DEFAULT 'open',
    "rsvpRequired" BOOLEAN NOT NULL DEFAULT true,
    "rsvpDeadline" TIMESTAMP(3),
    "maxAttendees" INTEGER,
    "isFree" BOOLEAN DEFAULT true,
    "ticketPrice" VARCHAR(50),
    "ticketPriceCents" INTEGER,
    "registrationLink" VARCHAR(500),
    "suggestedDonation" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "author" VARCHAR(255),
    "deletedAt" TIMESTAMP(6),
    "metaTitle" VARCHAR(100),
    "metaDesc" VARCHAR(160),
    "ogImage" VARCHAR(500),
    "gallery" JSONB,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsletterSubscriber" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" VARCHAR(255),
    "phone" VARCHAR(50),
    "county" VARCHAR(100),
    "subscribed" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "unsubscribedAt" TIMESTAMP(3),

    CONSTRAINT "NewsletterSubscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "youtubeId" VARCHAR(50) NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "thumbnail" VARCHAR(500),
    "published" BOOLEAN NOT NULL DEFAULT true,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RSVP" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(50),
    "county" VARCHAR(100),
    "idNumber" VARCHAR(50),
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'confirmed',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RSVP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GalleryCategory" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "category" VARCHAR(100) NOT NULL DEFAULT 'Rallies',
    "coverImage" VARCHAR(500),
    "published" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(6),

    CONSTRAINT "GalleryCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "author" VARCHAR(255),
    "email" VARCHAR(255),
    "postId" INTEGER,
    "videoId" INTEGER,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "reviewedAt" TIMESTAMP(3),
    "reviewedBy" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Volunteer" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(50),
    "county" VARCHAR(100) NOT NULL,
    "constituency" VARCHAR(100),
    "ward" VARCHAR(100),
    "role" VARCHAR(100) NOT NULL,
    "skills" TEXT,
    "availability" TEXT,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "notes" TEXT,
    "assignedTo" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Volunteer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Endorsement" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "organization" VARCHAR(255),
    "quote" TEXT NOT NULL,
    "photo" VARCHAR(500),
    "county" VARCHAR(100) NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Endorsement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ManifestoPillar" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "subtitle" VARCHAR(255),
    "icon" VARCHAR(100) NOT NULL,
    "summary" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "keyPoints" JSONB,
    "order" INTEGER NOT NULL,
    "color" VARCHAR(50) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "image" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ManifestoPillar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DonationTier" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "impactDescription" TEXT NOT NULL,
    "impactMetric" VARCHAR(255),
    "amountKES" INTEGER NOT NULL,
    "amountUSD" INTEGER,
    "category" VARCHAR(100) NOT NULL,
    "image" VARCHAR(500),
    "published" BOOLEAN NOT NULL DEFAULT true,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DonationTier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contribution" (
    "id" TEXT NOT NULL,
    "donorName" VARCHAR(255) NOT NULL,
    "donorEmail" VARCHAR(255) NOT NULL,
    "donorPhone" VARCHAR(50),
    "county" VARCHAR(100),
    "country" VARCHAR(100) NOT NULL DEFAULT 'Kenya',
    "donationTierId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" VARCHAR(3) NOT NULL DEFAULT 'KES',
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "message" TEXT,
    "paymentMethod" VARCHAR(50) NOT NULL,
    "transactionId" VARCHAR(255),
    "phoneNumber" VARCHAR(50),
    "nationality" VARCHAR(100),
    "idNumber" VARCHAR(50),
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaAsset" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "type" VARCHAR(50) NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "fileSize" VARCHAR(50),
    "dimensions" VARCHAR(50),
    "downloadCount" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignStat" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "volunteerCount" INTEGER NOT NULL DEFAULT 0,
    "totalContributions" INTEGER NOT NULL DEFAULT 0,
    "totalContributionAmount" INTEGER NOT NULL DEFAULT 0,
    "subscriberCount" INTEGER NOT NULL DEFAULT 0,
    "eventRSVPCount" INTEGER NOT NULL DEFAULT 0,
    "websiteVisits" INTEGER NOT NULL DEFAULT 0,
    "countyBreakdown" JSONB,

    CONSTRAINT "CampaignStat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE INDEX "Post_slug_idx" ON "Post"("slug");

-- CreateIndex
CREATE INDEX "Post_category_idx" ON "Post"("category");

-- CreateIndex
CREATE INDEX "Post_publishedAt_idx" ON "Post"("publishedAt");

-- CreateIndex
CREATE INDEX "Post_featured_idx" ON "Post"("featured");

-- CreateIndex
CREATE INDEX "Post_deletedAt_idx" ON "Post"("deletedAt");

-- CreateIndex
CREATE INDEX "Post_published_deletedAt_idx" ON "Post"("published", "deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_deletedAt_key" ON "Post"("slug", "deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");

-- CreateIndex
CREATE INDEX "Event_slug_idx" ON "Event"("slug");

-- CreateIndex
CREATE INDEX "Event_category_idx" ON "Event"("category");

-- CreateIndex
CREATE INDEX "Event_startDate_idx" ON "Event"("startDate");

-- CreateIndex
CREATE INDEX "Event_county_idx" ON "Event"("county");

-- CreateIndex
CREATE INDEX "Event_deletedAt_idx" ON "Event"("deletedAt");

-- CreateIndex
CREATE INDEX "Event_isPublic_idx" ON "Event"("isPublic");

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_deletedAt_key" ON "Event"("slug", "deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterSubscriber_email_key" ON "NewsletterSubscriber"("email");

-- CreateIndex
CREATE INDEX "NewsletterSubscriber_email_idx" ON "NewsletterSubscriber"("email");

-- CreateIndex
CREATE INDEX "NewsletterSubscriber_subscribed_idx" ON "NewsletterSubscriber"("subscribed");

-- CreateIndex
CREATE INDEX "NewsletterSubscriber_county_idx" ON "NewsletterSubscriber"("county");

-- CreateIndex
CREATE INDEX "Video_category_idx" ON "Video"("category");

-- CreateIndex
CREATE INDEX "Video_featured_idx" ON "Video"("featured");

-- CreateIndex
CREATE INDEX "Video_order_idx" ON "Video"("order");

-- CreateIndex
CREATE INDEX "Video_published_idx" ON "Video"("published");

-- CreateIndex
CREATE INDEX "RSVP_eventId_idx" ON "RSVP"("eventId");

-- CreateIndex
CREATE INDEX "RSVP_email_idx" ON "RSVP"("email");

-- CreateIndex
CREATE INDEX "RSVP_status_idx" ON "RSVP"("status");

-- CreateIndex
CREATE INDEX "RSVP_county_idx" ON "RSVP"("county");

-- CreateIndex
CREATE UNIQUE INDEX "GalleryCategory_slug_key" ON "GalleryCategory"("slug");

-- CreateIndex
CREATE INDEX "GalleryCategory_category_idx" ON "GalleryCategory"("category");

-- CreateIndex
CREATE INDEX "GalleryCategory_deletedAt_idx" ON "GalleryCategory"("deletedAt");

-- CreateIndex
CREATE INDEX "GalleryCategory_order_idx" ON "GalleryCategory"("order");

-- CreateIndex
CREATE INDEX "GalleryCategory_published_idx" ON "GalleryCategory"("published");

-- CreateIndex
CREATE INDEX "GalleryCategory_slug_idx" ON "GalleryCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "GalleryCategory_slug_deletedAt_unique" ON "GalleryCategory"("slug", "deletedAt");

-- CreateIndex
CREATE INDEX "Comment_postId_idx" ON "Comment"("postId");

-- CreateIndex
CREATE INDEX "Comment_videoId_idx" ON "Comment"("videoId");

-- CreateIndex
CREATE INDEX "Comment_approved_idx" ON "Comment"("approved");

-- CreateIndex
CREATE INDEX "Comment_createdAt_idx" ON "Comment"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Volunteer_email_key" ON "Volunteer"("email");

-- CreateIndex
CREATE INDEX "Volunteer_county_idx" ON "Volunteer"("county");

-- CreateIndex
CREATE INDEX "Volunteer_status_idx" ON "Volunteer"("status");

-- CreateIndex
CREATE INDEX "Volunteer_role_idx" ON "Volunteer"("role");

-- CreateIndex
CREATE INDEX "Volunteer_createdAt_idx" ON "Volunteer"("createdAt");

-- CreateIndex
CREATE INDEX "Endorsement_county_idx" ON "Endorsement"("county");

-- CreateIndex
CREATE INDEX "Endorsement_featured_idx" ON "Endorsement"("featured");

-- CreateIndex
CREATE INDEX "Endorsement_published_idx" ON "Endorsement"("published");

-- CreateIndex
CREATE INDEX "Endorsement_order_idx" ON "Endorsement"("order");

-- CreateIndex
CREATE INDEX "ManifestoPillar_order_idx" ON "ManifestoPillar"("order");

-- CreateIndex
CREATE INDEX "ManifestoPillar_published_idx" ON "ManifestoPillar"("published");

-- CreateIndex
CREATE INDEX "ManifestoPillar_featured_idx" ON "ManifestoPillar"("featured");

-- CreateIndex
CREATE INDEX "DonationTier_category_idx" ON "DonationTier"("category");

-- CreateIndex
CREATE INDEX "DonationTier_published_idx" ON "DonationTier"("published");

-- CreateIndex
CREATE INDEX "DonationTier_order_idx" ON "DonationTier"("order");

-- CreateIndex
CREATE INDEX "DonationTier_featured_idx" ON "DonationTier"("featured");

-- CreateIndex
CREATE INDEX "Contribution_donationTierId_idx" ON "Contribution"("donationTierId");

-- CreateIndex
CREATE INDEX "Contribution_status_idx" ON "Contribution"("status");

-- CreateIndex
CREATE INDEX "Contribution_createdAt_idx" ON "Contribution"("createdAt");

-- CreateIndex
CREATE INDEX "Contribution_county_idx" ON "Contribution"("county");

-- CreateIndex
CREATE INDEX "Contribution_transactionId_idx" ON "Contribution"("transactionId");

-- CreateIndex
CREATE INDEX "MediaAsset_type_idx" ON "MediaAsset"("type");

-- CreateIndex
CREATE INDEX "MediaAsset_category_idx" ON "MediaAsset"("category");

-- CreateIndex
CREATE INDEX "MediaAsset_published_idx" ON "MediaAsset"("published");

-- CreateIndex
CREATE INDEX "CampaignStat_date_idx" ON "CampaignStat"("date");

-- AddForeignKey
ALTER TABLE "RSVP" ADD CONSTRAINT "RSVP_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_donationTierId_fkey" FOREIGN KEY ("donationTierId") REFERENCES "DonationTier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

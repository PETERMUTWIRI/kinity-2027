-- CreateTable
CREATE TABLE "GalleryImage" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255),
    "url" VARCHAR(500) NOT NULL,
    "albumId" INTEGER,
    "photographer" VARCHAR(255),
    "location" VARCHAR(255),
    "county" VARCHAR(100),
    "eventDate" TIMESTAMP(3),
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(6),

    CONSTRAINT "GalleryImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GalleryImage_albumId_idx" ON "GalleryImage"("albumId");

-- CreateIndex
CREATE INDEX "GalleryImage_photographer_idx" ON "GalleryImage"("photographer");

-- CreateIndex
CREATE INDEX "GalleryImage_location_idx" ON "GalleryImage"("location");

-- CreateIndex
CREATE INDEX "GalleryImage_county_idx" ON "GalleryImage"("county");

-- CreateIndex
CREATE INDEX "GalleryImage_eventDate_idx" ON "GalleryImage"("eventDate");

-- CreateIndex
CREATE INDEX "GalleryImage_tags_idx" ON "GalleryImage"("tags");

-- CreateIndex
CREATE INDEX "GalleryImage_featured_idx" ON "GalleryImage"("featured");

-- CreateIndex
CREATE INDEX "GalleryImage_published_idx" ON "GalleryImage"("published");

-- CreateIndex
CREATE INDEX "GalleryImage_deletedAt_idx" ON "GalleryImage"("deletedAt");

-- CreateIndex
CREATE INDEX "GalleryImage_createdAt_idx" ON "GalleryImage"("createdAt");

-- AddForeignKey
ALTER TABLE "GalleryImage" ADD CONSTRAINT "GalleryImage_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "GalleryCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

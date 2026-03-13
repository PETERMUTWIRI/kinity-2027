-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "authorTitle" VARCHAR(255),
ADD COLUMN     "county" VARCHAR(100),
ADD COLUMN     "coverCaption" TEXT,
ADD COLUMN     "coverPhotographer" VARCHAR(255),
ADD COLUMN     "inlineImages" JSONB,
ADD COLUMN     "location" VARCHAR(255),
ADD COLUMN     "readingTime" INTEGER DEFAULT 0,
ADD COLUMN     "subtitle" VARCHAR(500),
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "wordCount" INTEGER DEFAULT 0;

-- CreateIndex
CREATE INDEX "Post_county_idx" ON "Post"("county");

-- CreateIndex
CREATE INDEX "Post_tags_idx" ON "Post"("tags");

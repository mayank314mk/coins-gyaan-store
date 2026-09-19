DROP INDEX "Product_isNew_createdAt_idx";

ALTER TABLE "Product" RENAME COLUMN "isNew" TO "isTrending";

CREATE INDEX "Product_isTrending_createdAt_idx" ON "Product"("isTrending", "createdAt");

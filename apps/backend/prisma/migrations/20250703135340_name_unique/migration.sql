/*
  Warnings:

  - A unique constraint covering the columns `[name,slug]` on the table `authors` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title,slug]` on the table `books` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,slug]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,slug]` on the table `publishers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "authors_slug_key";

-- DropIndex
DROP INDEX "books_slug_key";

-- DropIndex
DROP INDEX "categories_slug_key";

-- DropIndex
DROP INDEX "publishers_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "authors_name_slug_key" ON "authors"("name", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "books_title_slug_key" ON "books"("title", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_slug_key" ON "categories"("name", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "publishers_name_slug_key" ON "publishers"("name", "slug");

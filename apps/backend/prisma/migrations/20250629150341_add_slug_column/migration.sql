/*
  Warnings:

  - Added the required column `slug` to the `authors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `publishers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "authors" ADD COLUMN     "slug" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "books" ADD COLUMN     "slug" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "publishers" ADD COLUMN     "slug" VARCHAR(255) NOT NULL;

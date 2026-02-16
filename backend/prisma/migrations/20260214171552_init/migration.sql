/*
  Warnings:

  - You are about to drop the column `endYear` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `field` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `school` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `startYear` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `endYear` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `startYear` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `institution` to the `Education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `years` to the `Experience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Education" DROP COLUMN "endYear",
DROP COLUMN "field",
DROP COLUMN "school",
DROP COLUMN "startYear",
ADD COLUMN     "institution" TEXT NOT NULL,
ADD COLUMN     "year" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "endYear",
DROP COLUMN "startYear",
ADD COLUMN     "years" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "createdAt",
DROP COLUMN "fullName",
DROP COLUMN "location",
DROP COLUMN "phone";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt";

-- DropEnum
DROP TYPE "Role";

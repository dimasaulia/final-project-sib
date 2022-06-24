/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Profil` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Profil` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profil" ADD COLUMN     "email" TEXT NOT NULL,
ALTER COLUMN "full_name" DROP NOT NULL,
ALTER COLUMN "phone_number" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "profile_picture" DROP NOT NULL,
ALTER COLUMN "birth" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profil_email_key" ON "Profil"("email");

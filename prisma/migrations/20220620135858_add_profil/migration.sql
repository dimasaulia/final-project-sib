-- CreateTable
CREATE TABLE "Profil" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "phone_number" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "profile_picture" TEXT NOT NULL,
    "birth" TIMESTAMP(3) NOT NULL,
    "emailIsValid" BOOLEAN NOT NULL,
    "accountIsValid" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Profil_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profil_userId_key" ON "Profil"("userId");

-- AddForeignKey
ALTER TABLE "Profil" ADD CONSTRAINT "Profil_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

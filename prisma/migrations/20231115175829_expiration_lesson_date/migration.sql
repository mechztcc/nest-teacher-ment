-- CreateTable
CREATE TABLE "ExpirationDate" (
    "id" SERIAL NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExpirationDate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExpirationDate" ADD CONSTRAINT "ExpirationDate_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

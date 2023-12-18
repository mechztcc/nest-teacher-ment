-- CreateTable
CREATE TABLE "UserHistoryLessons" (
    "id" SERIAL NOT NULL,
    "done" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserHistoryLessons_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserHistoryLessons" ADD CONSTRAINT "UserHistoryLessons_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHistoryLessons" ADD CONSTRAINT "UserHistoryLessons_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

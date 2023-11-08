/*
  Warnings:

  - You are about to drop the column `lessonId` on the `Question` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_lessonId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "lessonId";

-- CreateTable
CREATE TABLE "QuestionsOnLessons" (
    "questionId" INTEGER NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionsOnLessons_pkey" PRIMARY KEY ("questionId","lessonId")
);

-- AddForeignKey
ALTER TABLE "QuestionsOnLessons" ADD CONSTRAINT "QuestionsOnLessons_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsOnLessons" ADD CONSTRAINT "QuestionsOnLessons_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

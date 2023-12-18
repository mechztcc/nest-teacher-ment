/*
  Warnings:

  - A unique constraint covering the columns `[lessonId]` on the table `UserHistoryLessons` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserHistoryLessons_lessonId_key" ON "UserHistoryLessons"("lessonId");

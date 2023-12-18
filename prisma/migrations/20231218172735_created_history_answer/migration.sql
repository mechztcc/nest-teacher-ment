-- CreateTable
CREATE TABLE "HistoryAnswer" (
    "id" SERIAL NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "alternativeId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    "userHistoryLessonId" INTEGER NOT NULL,

    CONSTRAINT "HistoryAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HistoryAnswer" ADD CONSTRAINT "HistoryAnswer_alternativeId_fkey" FOREIGN KEY ("alternativeId") REFERENCES "Alternative"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryAnswer" ADD CONSTRAINT "HistoryAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryAnswer" ADD CONSTRAINT "HistoryAnswer_userHistoryLessonId_fkey" FOREIGN KEY ("userHistoryLessonId") REFERENCES "UserHistoryLessons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

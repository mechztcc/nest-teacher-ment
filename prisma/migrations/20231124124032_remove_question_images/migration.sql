/*
  Warnings:

  - You are about to drop the `QuestionImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuestionImage" DROP CONSTRAINT "QuestionImage_questionId_fkey";

-- DropTable
DROP TABLE "QuestionImage";

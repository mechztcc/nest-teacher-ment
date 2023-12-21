/*
  Warnings:

  - A unique constraint covering the columns `[userId,teamRankId]` on the table `TeamRankMember` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "TeamRankMember_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "TeamRankMember_userId_teamRankId_key" ON "TeamRankMember"("userId", "teamRankId");


/*
  Warnings:

  - You are about to drop the `UserPontuation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserPontuation" DROP CONSTRAINT "UserPontuation_userId_fkey";

-- DropTable
DROP TABLE "UserPontuation";

-- CreateTable
CREATE TABLE "TeamRank" (
    "id" SERIAL NOT NULL,
    "teamId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamRank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamRankMember" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "teamRankId" INTEGER,

    CONSTRAINT "TeamRankMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TeamRank_teamId_key" ON "TeamRank"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamRankMember_userId_key" ON "TeamRankMember"("userId");

-- AddForeignKey
ALTER TABLE "TeamRank" ADD CONSTRAINT "TeamRank_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamRankMember" ADD CONSTRAINT "TeamRankMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamRankMember" ADD CONSTRAINT "TeamRankMember_teamRankId_fkey" FOREIGN KEY ("teamRankId") REFERENCES "TeamRank"("id") ON DELETE SET NULL ON UPDATE CASCADE;

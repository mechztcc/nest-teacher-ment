import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';
import { ComputingLessonResultDto } from '../../dto/computing-lesson-result.dto';

interface IRequest {
  userId: number;
  data: ComputingLessonResultDto;
}
@Injectable()
export class ComputingResultService {
  constructor(private readonly prisma: PrismaService) {}

  async execute({ data, userId }: IRequest): Promise<any> {
    const history = await this.prisma.userHistoryLessons.findFirst({
      where: { userId, lessonId: data.lessonId },
      include: { answers: true },
    });
    if (!history) {
      await this.prisma.userHistoryLessons.create({
        data: {
          done: false,
          lessonId: data.lessonId,
          userId,
          answers: {
            create: {
              alternativeId: data.answer.alternativeId,
              isCorrect: data.answer.isCorrect,
              questionId: data.answer.questionId,
            },
          },
        },
      });
    }

    if (history) {
      await this.prisma.historyAnswer.create({
        data: {
          alternativeId: data.answer.alternativeId,
          isCorrect: data.answer.isCorrect,
          questionId: data.answer.questionId,
          userHistoryLessonId: history.id,
        },
      });
    }

    const lesson = await this.prisma.lesson.findUnique({
      where: { id: data.lessonId },
      include: {
        team: {
          include: {
            TeamRank: { include: { teamRankMember: { where: { userId } } } },
          },
        },
      },
    });

    const rank = await this.prisma.teamRankMember.findFirst({
      where: { userId, teamRankId: lesson.team.TeamRank.id },
    });

    const question = await this.prisma.question.findUnique({
      where: { id: data.answer.questionId },
    });

    if (data.answer.isCorrect && rank) {
      await this.prisma.teamRankMember.updateMany({
        where: { userId, teamRankId: lesson.team.TeamRank.id },
        data: { score: rank.score + question.pontuation },
      });
    }

    if (data.answer.isCorrect && !rank) {
      await this.prisma.teamRankMember.create({
        data: {
          score: question.pontuation,
          userId,
          teamRankId: lesson.team.TeamRank.id,
        },
      });
    }

    await this.prisma.userPerformanceHistory.create({
      data: {
        hit: data.answer.isCorrect,
        lessonId: data.lessonId,
        questionId: data.answer.questionId,
        teamId: lesson.teamId,
        userId,
      },
    });

    return history;
  }
}

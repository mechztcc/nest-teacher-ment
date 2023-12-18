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
    const history = await this.prisma.userHistoryLessons.findUnique({
      where: { lessonId: data.lessonId },
      include: { answers: true },
    });
    if (!history) {
      await this.prisma.userHistoryLessons.create({
        data: {
          done: data.done,
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
      history.done = data.done;
      await this.prisma.historyAnswer.create({
        data: {
          alternativeId: data.answer.alternativeId,
          isCorrect: data.answer.isCorrect,
          questionId: data.answer.questionId,
          userHistoryLessonId: history.id,
        },
      });
    }

    const rank = await this.prisma.teamRankMember.findUnique({
      where: { userId },
    });

    if (data.answer.isCorrect) {
      await this.prisma.teamRankMember.update({
        where: { userId },
        data: { score: rank.score + 1 },
      });
    }

    return history;
  }
}

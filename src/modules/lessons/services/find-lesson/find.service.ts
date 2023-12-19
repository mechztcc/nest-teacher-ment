import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';

@Injectable()
export class FindLessonService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: number) {
    const query = await this.prisma.lesson.findUnique({
      where: { id },
      include: {
        owner: { select: { email: true, name: true } },
        team: { select: { name: true } },
        QuestionsOnLessons: {
          include: {
            question: {
              include: {
                alternatives: true,
                HistoryAnswer: true,
                topic: { select: { id: true, name: true } },
              },
            },
          },
          
        },
      },
    });

    let totalPoints = 0;

    query.QuestionsOnLessons.map((el) => {
      totalPoints += el.question.pontuation;
    });

    return { ...query, score: totalPoints };
  }
}

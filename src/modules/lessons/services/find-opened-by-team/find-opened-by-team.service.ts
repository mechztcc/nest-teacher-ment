import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';

@Injectable()
export class FindOpenedByTeamService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userId: number): Promise<any> {
    const query = await this.prisma.usersOnTeams.findFirst({
      where: { userId },
      include: {
        team: {
          include: {
            Lesson: {
              include: {
                QuestionsOnLessons: { include: { question: true } },
                difficulty: true,
              },
              where: {
                isOpened: true,
                UserHistoryLessons: { every: { done: false } },
              },
            },
          },
        },
      },
    });

    return query.team.Lesson.map((le) => {
      return {
        id: le.id,
        name: le.name,
        questions: le.QuestionsOnLessons.length,
        difficulty: le.difficulty.name,
        createdAt: le.createdAt,
      };
    });
  }
}

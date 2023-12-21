import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';

@Injectable()
export class FindOpenedByTeamService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userId: number): Promise<any> {
    const query = await this.prisma.usersOnTeams.findMany({
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
                OR: [
                  {
                    UserHistoryLessons: {
                      none: { user: { id: userId } }, // Retorna Lessons onde UserHistoryLessons não exista para o usuário específico
                    },
                  },
                  {
                    UserHistoryLessons: {
                      some: {
                        user: { id: userId },
                        done: false, // Retorna Lessons onde UserHistoryLessons tem done como false para o usuário específico
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },
    });

    const lessons = [];
    query.map((query) => {
      query.team.Lesson.map((le) => {
        lessons.push({
          id: le.id,
          name: le.name,
          questions: le.QuestionsOnLessons.length,
          difficulty: le.difficulty.name,
          createdAt: le.createdAt,
        });
      });
    });

    return lessons;
  }
}

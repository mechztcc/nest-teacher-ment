import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';

@Injectable()
export class FindLessonService {
  constructor(private readonly prisma: PrismaService) {}

  execute(id: number) {
    return this.prisma.lesson.findUnique({
      where: { id },
      include: {
        owner: { select: { email: true, name: true } },
        team: { select: { name: true } },
        QuestionsOnLessons: {
          include: {
            question: {
              include: {
                alternatives: true,
                topic: { select: { name: true } },
                QuestionImage: { select: { name: true, path: true } },
              },
            },
          },
        },
      },
    });
  }
}

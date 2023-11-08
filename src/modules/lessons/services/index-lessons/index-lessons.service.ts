import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';

@Injectable()
export class IndexLessonsService {
  constructor(private readonly prisma: PrismaService) {}

  execute(userId: number): Promise<any> {
    return this.prisma.lesson.findMany({
      where: { ownerId: userId },
      include: {
        team: { select: { id: true, name: true } },
        QuestionsOnLessons: { include: { question: true } },
        difficulty: { select: { id: true, name: true, level: true } },
      },
    });
  }
}

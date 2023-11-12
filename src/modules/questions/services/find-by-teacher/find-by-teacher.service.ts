import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';

@Injectable()
export class FindByTeacherService {
  constructor(private prisma: PrismaService) {}

  execute(userId: number): Promise<any> {
    return this.prisma.question.findMany({
      where: { userId },
      include: {
        topic: { select: { name: true } },
        alternatives: { select: { title: true, isCorrect: true } },
        QuestionImage: { select: { name: true, path: true } },
      },
    });
  }
}

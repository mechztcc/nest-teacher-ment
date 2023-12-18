import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';

@Injectable()
export class CompleteLessonService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(lessonId: number): Promise<any> {
    const history = this.prisma.userHistoryLessons.findUnique({
      where: { lessonId },
    });

    if (!history) {
      throw new NotFoundException('Lesson History not found.');
    }

    return await this.prisma.userHistoryLessons.update({
      data: { done: true },
      where: { lessonId },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';

interface IRequest {
  lessonId: number;
  userId: number;
}

@Injectable()
export class CompleteLessonService {
  constructor(private readonly prisma: PrismaService) {}

  async execute({ lessonId, userId }: IRequest): Promise<any> {
    const history = this.prisma.userHistoryLessons.findFirst({
      where: { lessonId, userId },
    });

    return await this.prisma.userHistoryLessons.updateMany({
      data: { done: true },
      where: { lessonId, userId },
    });
  }
}

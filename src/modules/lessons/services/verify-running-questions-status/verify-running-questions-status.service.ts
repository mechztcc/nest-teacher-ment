import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';

interface IRequest {
  lessonId: number;
  userId: number;
}
@Injectable()
export class VerifyRunningQuestionsStatusService {
  constructor(private readonly prisma: PrismaService) {}

  async execute({ lessonId, userId }: IRequest): Promise<any> {
    const query = await this.prisma.userHistoryLessons.findUnique({
      where: { lessonId, userId },
      include: { answers: true },
    });

    console.log(query);
    return query;
  }
}

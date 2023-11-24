import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';

@Injectable()
export class FindQuestionService {
  constructor(private readonly prisma: PrismaService) {}

  execute(id: number) {
    return this.prisma.question.findUnique({
      where: { id },
      include: {
        topic: { select: { name: true, id: true } },
        alternatives: true,
      },
    });
  }
}

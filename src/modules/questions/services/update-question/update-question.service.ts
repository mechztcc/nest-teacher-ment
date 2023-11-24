import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';
import { UpdateQuestionDto } from '../../dto/update-question.dto';

@Injectable()
export class UpdateQuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(payload: UpdateQuestionDto): Promise<any> {
    const question = await this.prisma.question.findUnique({
      where: { id: payload.id },
    });

    const topic = await this.prisma.topic.findUnique({
      where: { id: payload.topicId },
    });

    if (!topic) {
      throw new NotFoundException('Provided topic has not found');
    }

    if (!question) {
      throw new NotFoundException('Provided question has not found');
    }

    return await this.prisma.question.update({
      data: {
        pontuation: payload.pontuation,
        title: payload.title,
        topicId: payload.topicId,
      },
      where: { id: payload.id },
    });
  }
}

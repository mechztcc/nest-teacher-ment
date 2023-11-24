import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';
import { CreateQuestionDto } from '../../dto/create-question.dto';

@Injectable()
export class CreateQuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    { alternatives, title, topic, pontuation }: CreateQuestionDto,
    userId: number,
  ) {
    const topicExists = await this.prisma.topic.findUnique({
      where: { id: topic },
    });
    if (!topicExists) {
      throw new NotFoundException('Topic not found.');
    }

    const question = await this.prisma.question.create({
      data: {
        title: title,
        topicId: topic,
        userId,
        pontuation: pontuation,
        alternatives: {
          createMany: {
            data: alternatives.map((alternative) => {
              return {
                ...alternative,
              };
            }),
          },
        },
      },
    });

    return question;
  }
}

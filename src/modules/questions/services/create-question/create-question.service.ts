import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';
import { CreateQuestionDto } from '../../dto/create-question.dto';

@Injectable()
export class CreateQuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    { alternatives, title, topic }: CreateQuestionDto,
    userId: number,
  ) {
    const topicExists = await this.prisma.topic.findUnique({
      where: { id: topic },
    });
    if (!topicExists) {
      throw new NotFoundException('Topic not found.');
    }


    const bulkImages = [
      {
        name: 'Image 1',
        path: 'https://www.telegraph.co.uk/content/dam/news/2016/05/15/Maths-problem-trending_trans_NvBQzQNjv4BqzTW4Ql1t-1Xt3_aTCx9yp4V4XZMU8yV22wInfrfUWRg.PNG',
      },
      {
        name: 'Image 1',
        path: 'https://www.telegraph.co.uk/content/dam/news/2016/05/15/Maths-problem-trending_trans_NvBQzQNjv4BqzTW4Ql1t-1Xt3_aTCx9yp4V4XZMU8yV22wInfrfUWRg.PNG',
      },
    ];

    const question = await this.prisma.question.create({
      data: {
        title: title,
        topicId: topic,
        userId,
        QuestionImage: { createMany: { data: bulkImages } },
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

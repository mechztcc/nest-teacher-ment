import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';
import { CreateQuestionDto } from '../../dto/create-question.dto';

@Injectable()
export class CreateQuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async execute({ alternatives, title, topic }: CreateQuestionDto) {
    const fakeFiles = [];

    const topicExists = await this.prisma.topic.findUnique({
      where: { id: topic },
    });
    if (!topicExists) {
      throw new NotFoundException('Topic not found.');
    }

    const question = await this.prisma.question.create({
      data: { title: title, topicId: topic, userId: 1 },
    });

    const bulkAlternatives = alternatives.map((alternative) => {
      return {
        ...alternative,
        questionId: question.id,
      };
    });

    const image = await this.prisma.questionImage.create({
      data: { name: 'name', path: 'path', questionId: question.id },
    });

    const alternative = await this.prisma.alternative.createMany({
      data: bulkAlternatives,
    });

    return {
      title: question.title,
      images: [image],
      alternatives: alternative,
    };
  }
}

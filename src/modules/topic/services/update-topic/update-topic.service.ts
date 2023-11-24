import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';
import { UpdateTopicDto } from '../../dtos/update-topic.dto';

interface IRequest {
  data: UpdateTopicDto;
  topicId: number;
}

@Injectable()
export class UpdateTopicService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(payload: IRequest): Promise<any> {
    const topicExists = await this.prisma.topic.findUnique({
      where: { id: payload.topicId },
    });

    if (!topicExists) {
      throw new NotFoundException('Provided topic has not found.');
    }

    return await this.prisma.topic.update({
      data: { name: payload.data.name },
      where: { id: payload.topicId },
    });
  }
}

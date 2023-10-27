import { Injectable } from '@nestjs/common';
import { CreateTopicDto } from '../../dtos/create-topic.dto';
import { PrismaService } from 'src/modules/prisma/PrismaClient';

@Injectable()
export class CreateTopicService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(payload: CreateTopicDto) {
    return await this.prisma.topic.create({ data: payload });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';

@Injectable()
export class IndexTopicService {
  constructor(private readonly prisma: PrismaService) {}

  async execute() {
    return await this.prisma.topic.findMany();
  }
}

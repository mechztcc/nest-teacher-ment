import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';

@Injectable()
export class IndexDifficultiesService {
  constructor(private readonly prisma: PrismaService) {}

  execute(): Promise<any> {
    return this.prisma.difficulty.findMany();
  }
}

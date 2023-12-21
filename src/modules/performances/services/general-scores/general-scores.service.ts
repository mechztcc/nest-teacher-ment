import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';

@Injectable()
export class GeneralScoresService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userId: number): Promise<any> {
    const hitCount = await this.prisma.userPerformanceHistory.count({
      where: {
        userId,
        hit: true,
      },
    });

    const wrongCount = await this.prisma.userPerformanceHistory.count({
      where: {
        userId,
        hit: false,
      },
    });

    return {
      hitCount,
      wrongCount,
      total: hitCount + wrongCount,
    };
  }
}

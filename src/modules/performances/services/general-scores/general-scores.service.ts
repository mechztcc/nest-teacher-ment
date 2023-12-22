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

    const student = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    let ranking = 'Novato';

    if (hitCount > 1 && hitCount < 2) {
      ranking = 'Bronze';
    }

    if (hitCount > 2 && hitCount < 3) {
      ranking = 'Prata';
    }

    if (hitCount > 3 && hitCount < 4) {
      ranking = 'Ouro';
    }

    if (hitCount > 4 && hitCount < 5) {
      ranking = 'Platina';
    }

    if (hitCount > 5 && hitCount < 6) {
      ranking = 'Diamante';
    }

    if (hitCount > 6 && hitCount < 7) {
      ranking = 'Mestre';
    }

    if (hitCount > 9) {
      ranking = 'Grão Mestre';
    }

    return {
      hitCount,
      wrongCount,
      total: hitCount + wrongCount,
      ranking,
      name: student.name
    };
  }
}

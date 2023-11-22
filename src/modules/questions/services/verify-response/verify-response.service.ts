import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';
import { VerifyAswerDto } from '../../dto/verify-aswer.dto';

interface IRequest {
  data: VerifyAswerDto;
  userId: number;
}

@Injectable()
export class VerifyResponseService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(payload: IRequest): Promise<any> {
    const question = await this.prisma.question.findUnique({
      where: {
        id: payload.data.questionId,
      },
      include: { alternatives: true },
    });

    if (!question) {
      throw new NotFoundException('Provided question has not found');
    }

    const alternative = await this.prisma.alternative.findUnique({
      where: { id: payload.data.alternativeId },
    });

    if (!alternative) {
        throw new NotFoundException('Provided alternative has not found');
      }

    const pontuationExists = await this.prisma.userPontuation.findUnique({
      where: { userId: payload.userId },
    });

    if (alternative.isCorrect && pontuationExists) {
      await this.prisma.userPontuation.update({
        data: { score: pontuationExists.score + question.pontuation },
        where: { userId: payload.userId },
      });
    }

    if (alternative.isCorrect && !pontuationExists) {
      await this.prisma.userPontuation.create({
        data: { score: question.pontuation, userId: payload.userId },
      });
    }

    return {
      isCorrect: alternative.isCorrect,
    };
  }
}

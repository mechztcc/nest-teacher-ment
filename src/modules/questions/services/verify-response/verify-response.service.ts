import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
    const userExists = await this.prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!userExists) {
      throw new NotFoundException('Provided user has not found');
    }

    if (userExists.role === 'TEACHER') {
      throw new UnauthorizedException('Only students can answer questions');
    }

    const question = await this.prisma.question.findUnique({
      where: {
        id: payload.data.questionId,
      },
      include: { alternatives: true },
    });

    const teamRank = await this.prisma.questionsOnLessons.findUnique({
      where: {
        questionId_lessonId: {
          lessonId: payload.data.lessonId,
          questionId: payload.data.questionId,
        },
      },
      include: {
        lesson: { include: { team: { include: { TeamRank: true } } } },
      },
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

    const score = await this.prisma.teamRankMember.findUnique({
      where: {
        userId: payload.userId,
        teamRankId: teamRank.lesson.team.TeamRank.id,
      },
    });

    if (alternative.isCorrect) {
      await this.prisma.teamRankMember.update({
        data: { score: score.score + question.pontuation },
        where: { id: score.id },
      });
    }

    return {
      isCorrect: alternative.isCorrect,
    };
  }
}

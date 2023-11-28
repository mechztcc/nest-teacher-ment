import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';

interface IRequest {
  userId: number;
  code: string;
}

@Injectable()
export class JoinTeamWithCodeService {
  constructor(private prisma: PrismaService) {}

  async execute(payload: IRequest): Promise<any> {
    const inviteCodeExists = await this.prisma.invitationCode.findUnique({
      where: { code: payload.code },
      include: { team: { include: { TeamRank: true } } },
    });

    if (!inviteCodeExists) {
      throw new NotFoundException('Provided invitation code is invalid');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (user.role !== 'STUDENT') {
      throw new UnprocessableEntityException(
        'Only students can join a team using an invitation code',
      );
    }

    const userExistsOnteams = await this.prisma.usersOnTeams.findUnique({
      where: {
        userId_teamId: { teamId: inviteCodeExists.teamId, userId: user.id },
      },
    });

    if (userExistsOnteams) {
      throw new ConflictException('Provided user can only have one team.');
    }

    await this.prisma.usersOnTeams.create({
      data: { teamId: inviteCodeExists.teamId, userId: payload.userId },
    });

    return await this.prisma.teamRankMember.create({
      data: {
        score: 0,
        teamRankId: inviteCodeExists.team.TeamRank.id,
        userId: payload.userId,
      },
    });
  }
}

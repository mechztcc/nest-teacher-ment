import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';
import { CreateTeamDto } from '../../dtos/create-team.dto';

@Injectable()
export class CreateTeamService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(payload: CreateTeamDto, userId: number) {
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (userExists.role === 'STUDENT') {
      throw new UnauthorizedException(
        'Its not possible create a Team by Student Role',
      );
    }

    const team = await this.prisma.team.create({
      data: {
        ...payload,
        ownerId: userId,
        InvitationCode: { create: {} },
        TeamRank: { create: {} },
      },
    });

    return team;
  }
}

import {
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

    return await this.prisma.usersOnTeams.create({
      data: { teamId: inviteCodeExists.teamId, userId: payload.userId },
    });
  }
}

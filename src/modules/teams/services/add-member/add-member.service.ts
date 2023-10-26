import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';
import { AddMemberDto } from '../../dtos/add-member.dto';

@Injectable()
export class AddMemberService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(payload: AddMemberDto) {
    const teamExists = await this.prisma.team.findUnique({
      where: { id: payload.teamId },
    });

    if (!teamExists) {
      throw new NotFoundException('Team not found.');
    }

    const userExists = await this.prisma.user.findUnique({
      where: { id: payload.userId },
    });
    if (!userExists) {
      throw new NotFoundException('User not found.');
    }

    if (userExists.role == 'TEACHER') {
      throw new ConflictException('Its not possible add a TEACHER as Member.');
    }

    const userOnTeamExists = await this.prisma.usersOnTeams.findMany({
      where: { teamId: payload.teamId, userId: payload.userId },
    });

    if (userOnTeamExists.length) {
      throw new ConflictException('Provided users already in this team.');
    }

    return this.prisma.usersOnTeams.create({
      data: { teamId: payload.teamId, userId: payload.userId },
    });
  }
}

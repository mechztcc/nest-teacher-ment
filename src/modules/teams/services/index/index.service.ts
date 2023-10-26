import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';

@Injectable()
export class IndexTeamService {
  constructor(private readonly prisma: PrismaService) {}

  execute() {
    return this.prisma.team.findMany({
      include: { UsersOnTeams: { include: { user: true } } },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';

@Injectable()
export class FindOpenedByTeamService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userId: number): Promise<any> {
    const query = await this.prisma.usersOnTeams.findFirst({
      where: { userId },
      include: { team: { include: { Lesson: { where: { isOpened: true } } } } },
    });

    return query;
  }
}

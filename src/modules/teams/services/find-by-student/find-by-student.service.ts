import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';

@Injectable()
export class FindByStudentService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userId: number): Promise<any> {
    const query = await this.prisma.usersOnTeams.findFirst({
      where: { userId },
      include: { user: true, team: true },
    });

    query.user.password = null;

    return {
      user: query.user,
      team: query.team,
      createdAt: query.createdAt
    };
  }
}

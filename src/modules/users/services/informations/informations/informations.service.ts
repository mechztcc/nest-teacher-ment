import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';

@Injectable()
export class InformationsService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: number): Promise<any> {
    const teamsCount = await this.prisma.team.count({ where: { ownerId: id } });
    const studentsCount = await this.prisma.team.findMany({
      where: { ownerId: id },
      include: { UsersOnTeams: { include: { user: true } } },
    });

    return { teamsCount: teamsCount, studentsCount: 0 };
  }
}

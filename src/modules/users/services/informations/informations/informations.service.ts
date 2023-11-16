import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';

@Injectable()
export class InformationsService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: number): Promise<any> {
    const teamsCount = await this.prisma.team.count({ where: { ownerId: id } });
    const lessonsCount = await this.prisma.lesson.count({
      where: { ownerId: id },
    });
    const students = await this.prisma.usersOnTeams.count({
      where: { team: { ownerId: id } },
    });

    const runningLessons = await this.prisma.lesson.findMany({
      include: { difficulty: true, ExpirationDate: true, team: { include: { UsersOnTeams: true }} },
      where: { isOpened: true, ownerId: id },
    });

    return {
      teamsCount: teamsCount,
      studentsCount: students,
      lessonsCount: lessonsCount,
      runningLessons,
    };
  }
}

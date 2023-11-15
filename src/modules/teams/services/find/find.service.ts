import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';

@Injectable()
export class FindService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userId: number, id: number): Promise<any> {
    const teamExists = await this.prisma.team.findUnique({
      where: { id: id },
      include: {
        UsersOnTeams: {
          include: {
            user: { select: { id: true, name: true, email: true, role: true } },
          },
        },
        Lesson: {
          include: {
            difficulty: { select: { id: true, name: true, level: true } },
            ExpirationDate: { take: 1 },
          },
          where: { isOpened: true },
        },
        owner: { select: { name: true, id: true, email: true } },
      },
    });

    if (!teamExists) {
      throw new NotFoundException('Provided Team has not found');
    }

    if (teamExists.ownerId !== userId) {
      throw new UnauthorizedException('Provided user its not the owner.');
    }

    return teamExists;
  }
}

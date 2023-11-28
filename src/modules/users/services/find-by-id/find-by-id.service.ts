import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';

@Injectable()
export class FindByIdService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userId: number): Promise<any> {
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId, role: 'STUDENT' },
      include: {
        UsersOnTeams: { include: { team: true } },
      },
    });

    if (!userExists) {
      throw new NotFoundException('Provided user has not found');
    }

    return {
      id: userExists.id,
      email: userExists.email,
      name: userExists.name,
      role: userExists.role,
      createdAt: userExists.createdAt,
      teams: userExists.UsersOnTeams.map((el) => {
        return {
          id: el.team.id,
          name: el.team.name,
        };
      }),
    };
  }
}

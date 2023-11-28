import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';

@Injectable()
export class FindByEmailService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(email: string): Promise<any> {
    const userExists = await this.prisma.user.findUnique({
      where: { email, role: 'STUDENT' },
      include: {
        UsersOnTeams: { include: { team: true } },
        UserPontuation: { select: { score: true } },
      },
    });

    if (!userExists) {
      return {
        message: 'User not found.',
      };
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
      pontuation: userExists.UserPontuation.score,
    };
  }
}

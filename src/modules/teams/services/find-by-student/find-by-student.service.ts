import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';

@Injectable()
export class FindByStudentService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userId: number): Promise<any> {
    const query = await this.prisma.usersOnTeams.findMany({
      where: { userId },
      include: {
        user: true,
        team: {
          include: {
            UsersOnTeams: { include: { user: true } },
            TeamRank: {
              include: { teamRankMember: { where: { user: { id: userId } }, include: { user: true} } },
            },
          },
        },
      },
    });

    const password = (query[0].user.password = null);

    return {
      user: {
        ...query[0]?.user,
        password,
      },
      teams: query.map((el) => {
        return {
          id: el.team.id,
          name: el.team.name,
          members: el.team.TeamRank.teamRankMember.map((member) => {
            return {
              id: member.user.id,
              name: member.user.name,
              score:member.score
            }
          })
        };
      }),
    };
  }
}

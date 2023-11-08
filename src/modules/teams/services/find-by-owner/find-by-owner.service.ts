import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';

@Injectable()
export class FindByOwnerService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userId: number) {
    return await this.prisma.team.findMany({ where: { ownerId: userId }, include: { UsersOnTeams: true } });
  }
}

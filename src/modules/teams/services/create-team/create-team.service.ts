import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';
import { CreateTeamDto } from '../../dtos/create-team.dto';

@Injectable()
export class CreateTeamService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(payload: CreateTeamDto, userId: number) {
    return await this.prisma.team.create({
      data: { ...payload, ownerId: userId },
    });
  }
}

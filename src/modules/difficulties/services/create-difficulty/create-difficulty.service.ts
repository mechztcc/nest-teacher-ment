import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';
import { CreateDifficultyDto } from '../../dto/create-difficulty.dto';

@Injectable()
export class CreateDifficultyService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(payload: CreateDifficultyDto): Promise<any> {
    return await this.prisma.difficulty.create({
      data: { level: 1, name: payload.name },
    });
  }
}

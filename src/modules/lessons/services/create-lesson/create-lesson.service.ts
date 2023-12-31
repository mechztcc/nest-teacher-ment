import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';
import { CreateLessonDto } from '../../dto/create-lesson.dto';

@Injectable()
export class CreateLessonService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(payload: CreateLessonDto, userId: number) {
    const teamExists = await this.prisma.team.findUnique({
      where: { id: payload.teamId },
    });

    if (!teamExists) {
      throw new NotFoundException('Provided Team has not found.');
    }

    if (teamExists.ownerId !== userId) {
      throw new UnauthorizedException(
        'Provided User its not the Owner of this Team',
      );
    }

    const difficultyExists = await this.prisma.difficulty.findUnique({
      where: { id: payload.difficultyId },
    });

    if (!difficultyExists) {
      throw new NotFoundException('Provided difficulty has not found.');
    }

    return this.prisma.lesson.create({ data: { ...payload, ownerId: userId } });
  }
}

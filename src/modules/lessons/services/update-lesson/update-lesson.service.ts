import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';
import { UpdateLessonDto } from '../../dto/update-lesson.dto';

interface IRequest {
  data: UpdateLessonDto;
  lessonId: number;
}

@Injectable()
export class UpdateLessonService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(payload: IRequest): Promise<any> {
    console.log(payload);

    const lessonExists = await this.prisma.lesson.findUnique({
      where: { id: payload.lessonId },
    });

    if (!lessonExists) {
      throw new NotFoundException('Provided lesson not found');
    }

    const difficultExists = await this.prisma.difficulty.findUnique({
      where: { id: payload.data.difficultyId },
    });

    if (!difficultExists) {
      throw new NotFoundException('Provided difficulty not found');
    }

    return await this.prisma.lesson.update({
      data: {
        name: payload.data.name,
        difficultyId: payload.data.difficultyId,
      },
      where: { id: payload.lessonId },
    });
  }
}

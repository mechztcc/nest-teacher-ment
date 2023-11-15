import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';

@Injectable()
export class OpenLessonService {
  constructor(private prisma: PrismaService) {}

  async execute(userId: number, lessonId: number): Promise<any> {
    const lessonExists = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!lessonExists) {
      throw new NotFoundException('Provided lesson has not found.');
    }

    if (lessonExists.ownerId !== userId) {
      throw new UnauthorizedException(
        'Provided user its not the owner of this lesson',
      );
    }

    return this.prisma.lesson.update({
      where: { id: lessonId },
      data: { isOpened: true },
    });
  }
}

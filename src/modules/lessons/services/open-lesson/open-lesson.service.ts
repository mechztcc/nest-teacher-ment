import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { log } from 'console';
import { PrismaService } from 'src/modules/prisma/PrismaClient';

interface IRequest {
  userId: number;
  lessonId: number;
  expiresAt: string;
}

@Injectable()
export class OpenLessonService {
  constructor(private prisma: PrismaService) {}

  async execute({ lessonId, expiresAt, userId }: IRequest): Promise<any> {
    const lessonExists = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
    });

    const date = new Date(expiresAt);

    if (!date.getDate()) {
      throw new ForbiddenException('Provided data format its not valid');
    }

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
      data: { isOpened: true, ExpirationDate: { create: { expiresAt: date } } },
    });
  }
}

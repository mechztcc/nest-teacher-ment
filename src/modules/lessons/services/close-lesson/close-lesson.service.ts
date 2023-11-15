import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';

interface IRequest {
  userId: number;
  lessonId: number;
}

@Injectable()
export class CloseLessonService {
  constructor(private prisma: PrismaService) {}

  async execute(payload: IRequest): Promise<any> {
    const lessonExists = await this.prisma.lesson.findUnique({
      where: { id: payload.lessonId },
    });

    if (!lessonExists) {
      throw new NotFoundException('Provided lesson has not found');
    }

    if (lessonExists.ownerId !== payload.userId) {
      throw new UnauthorizedException(
        'Provided user is not the owner of this lesson',
      );
    }

    return await this.prisma.lesson.update({
      where: { id: payload.lessonId },
      data: { isOpened: false },
    });
  }
}

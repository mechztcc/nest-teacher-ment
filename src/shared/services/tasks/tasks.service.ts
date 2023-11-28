import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/modules/prisma/PrismaClient';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_10_HOURS)
  async handleCron() {
    const lessons = await this.prisma.lesson.findMany({
      where: { isOpened: true },
      include: { ExpirationDate: { select: { expiresAt: true } } },
    });
    
    lessons.map(async (lesson) => {
      const now = new Date();
      const date = new Date(lesson.ExpirationDate[0].expiresAt);

      if (now.getTime() > date.getTime()) {
        this.logger.debug(
          `lesson ${lesson.id} has expires and have been closed.`,
        );

        await this.prisma.lesson.update({
          data: { isOpened: false },
          where: { id: lesson.id },
        });
      }
    });

    this.logger.debug('Verify expirated lessons!');
  }
}

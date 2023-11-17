import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';

@Injectable()
export class FindProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userId: number): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: {
          select: { organization: true, city: true, phone: true, state: true },
        },
        Lesson: true,
        Team: true
      },
    });

    user.password = null;

    return user;
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';

@Injectable()
export class FindByEmailService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(email: string): Promise<any> {
    const userExists = await this.prisma.user.findUnique({
      where: { email, role: 'STUDENT' },
    });

    return userExists;
  }
}

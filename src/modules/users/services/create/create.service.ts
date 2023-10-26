import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';

@Injectable()
export class CreateUserService {
  constructor(private prisma: PrismaService) {}

  async store(): Promise<any> {
    const user = this.prisma.user.create({
      data: { email: 'test', password: 'password', name: 'name' },
    });

    return user;
  }
}

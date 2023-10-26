import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';
import { CreateUserDto } from '../../dtos/create-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserService {
  constructor(private prisma: PrismaService) {}

  async store(payload: CreateUserDto): Promise<any> {
    const userExists = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (userExists) {
      throw new ConflictException('E-mail already been used.');
    }

    const hashedPass = await bcrypt.hash(payload.password, 10);

    const user = this.prisma.user.create({
      data: { ...payload, password: hashedPass },
    });

    return user;
  }
}

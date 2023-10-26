import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';
import { CreateSessionDto } from '../../dto/create-session.dto';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CreateSessionService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async execute({ email, password }: CreateSessionDto): Promise<any> {
    const userExists = await this.prisma.user.findUnique({ where: { email } });

    if (!userExists) {
      throw new NotFoundException('Invalid credentials.');
    }

    const match = await bcrypt.compare(password, userExists.password);
    if (!match) {
      throw new NotFoundException('Invalid credentials.');
    }

    const payload = { id: userExists.id, email: userExists.email };

    return {
      user: { ...userExists, password: null },
      token: await this.jwtService.signAsync(payload),
    };
  }
}

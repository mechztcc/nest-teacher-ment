import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';

@Injectable()
export class JoinTeamWithCodeService {
  constructor(private prisma: PrismaService) {}

  execute(code: string): Promise<any> {
    return;
  }
}

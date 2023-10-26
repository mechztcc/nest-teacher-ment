import { Module } from '@nestjs/common';
import { PrismaService } from './PrismaClient';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

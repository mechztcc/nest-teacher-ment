import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { DifficultiesController } from './controllers/difficulties.controller';
import { CreateDifficultyService } from './services/create-difficulty/create-difficulty.service';

@Module({
  controllers: [DifficultiesController],
  providers: [CreateDifficultyService],
  imports: [PrismaModule],
})
export class DifficultiesModule {}

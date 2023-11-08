import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { DifficultiesController } from './controllers/difficulties.controller';
import { CreateDifficultyService } from './services/create-difficulty/create-difficulty.service';
import { IndexDifficultiesService } from './services/index-difficulties/index-difficulties.service';

@Module({
  controllers: [DifficultiesController],
  providers: [CreateDifficultyService, IndexDifficultiesService],
  imports: [PrismaModule],
})
export class DifficultiesModule {}

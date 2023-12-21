import { Module } from '@nestjs/common';
import { GeneralScoresService } from './services/general-scores/general-scores.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PerformancesController } from './controllers/performances.controller';

@Module({
  providers: [GeneralScoresService],
  imports: [PrismaModule],
  controllers: [PerformancesController],
})
export class PerformancesModule {}

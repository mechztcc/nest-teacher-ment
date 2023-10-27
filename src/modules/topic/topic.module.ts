import { Module } from '@nestjs/common';
import { CreateTopicService } from './services/create-topic/create-topic.service';
import { TopicController } from './controllers/topic.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [CreateTopicService],
  controllers: [TopicController],
  imports: [PrismaModule],
})
export class TopicModule {}

import { Module } from '@nestjs/common';
import { CreateTopicService } from './services/create-topic/create-topic.service';
import { TopicController } from './controllers/topic.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { IndexTopicService } from './services/index-topic/index-topic.service';

@Module({
  providers: [CreateTopicService, IndexTopicService],
  controllers: [TopicController],
  imports: [PrismaModule],
})
export class TopicModule {}

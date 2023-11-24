import { Module } from '@nestjs/common';
import { CreateTopicService } from './services/create-topic/create-topic.service';
import { TopicController } from './controllers/topic.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { IndexTopicService } from './services/index-topic/index-topic.service';
import { UpdateTopicService } from './services/update-topic/update-topic.service';

@Module({
  providers: [CreateTopicService, IndexTopicService, UpdateTopicService],
  controllers: [TopicController],
  imports: [PrismaModule],
})
export class TopicModule {}

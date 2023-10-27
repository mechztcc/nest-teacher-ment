import { Body, Controller, Post } from '@nestjs/common';
import { CreateTopicService } from '../services/create-topic/create-topic.service';
import { CreateTopicDto } from '../dtos/create-topic.dto';

@Controller('topic')
export class TopicController {
  constructor(private readonly createTopic: CreateTopicService) {}

  @Post()
  store(@Body() payload: CreateTopicDto) {
    return this.createTopic.execute(payload);
  }
}

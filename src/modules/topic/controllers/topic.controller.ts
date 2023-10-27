import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTopicDto } from '../dtos/create-topic.dto';
import { CreateTopicService } from '../services/create-topic/create-topic.service';
import { IndexTopicService } from '../services/index-topic/index-topic.service';

@Controller('topic')
export class TopicController {
  constructor(
    private readonly createTopic: CreateTopicService,
    private readonly indexTopic: IndexTopicService,
  ) {}

  @Post()
  store(@Body() payload: CreateTopicDto) {
    return this.createTopic.execute(payload);
  }

  @Get()
  index() {
    return this.indexTopic.execute();
  }
}

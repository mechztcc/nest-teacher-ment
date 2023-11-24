import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTopicDto } from '../dtos/create-topic.dto';
import { CreateTopicService } from '../services/create-topic/create-topic.service';
import { IndexTopicService } from '../services/index-topic/index-topic.service';
import { UpdateTopicService } from '../services/update-topic/update-topic.service';
import { UpdateTopicDto } from '../dtos/update-topic.dto';

@Controller('topic')
export class TopicController {
  constructor(
    private readonly createTopic: CreateTopicService,
    private readonly indexTopic: IndexTopicService,
    private readonly updateTopic: UpdateTopicService,
  ) {}

  @Post()
  store(@Body() payload: CreateTopicDto) {
    return this.createTopic.execute(payload);
  }

  @Get()
  index() {
    return this.indexTopic.execute();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateTopicDto) {
    return this.updateTopic.execute({ data: payload, topicId: Number(id) });
  }
}

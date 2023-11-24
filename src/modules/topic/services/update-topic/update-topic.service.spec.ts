import { Test, TestingModule } from '@nestjs/testing';
import { UpdateTopicService } from './update-topic.service';

describe('UpdateTopicService', () => {
  let service: UpdateTopicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateTopicService],
    }).compile();

    service = module.get<UpdateTopicService>(UpdateTopicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

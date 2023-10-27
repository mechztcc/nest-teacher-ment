import { Test, TestingModule } from '@nestjs/testing';
import { IndexTopicService } from './index-topic.service';

describe('IndexTopicService', () => {
  let service: IndexTopicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndexTopicService],
    }).compile();

    service = module.get<IndexTopicService>(IndexTopicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

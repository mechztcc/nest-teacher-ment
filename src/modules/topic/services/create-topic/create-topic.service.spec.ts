import { Test, TestingModule } from '@nestjs/testing';
import { CreateTopicService } from './create-topic.service';

describe('CreateTopicService', () => {
  let service: CreateTopicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateTopicService],
    }).compile();

    service = module.get<CreateTopicService>(CreateTopicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

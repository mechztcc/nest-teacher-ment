import { Test, TestingModule } from '@nestjs/testing';
import { RemoveQuestionService } from './remove-question.service';

describe('RemoveQuestionService', () => {
  let service: RemoveQuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemoveQuestionService],
    }).compile();

    service = module.get<RemoveQuestionService>(RemoveQuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

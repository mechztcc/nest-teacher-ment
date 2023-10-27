import { Test, TestingModule } from '@nestjs/testing';
import { FindQuestionService } from './find-question.service';

describe('FindQuestionService', () => {
  let service: FindQuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindQuestionService],
    }).compile();

    service = module.get<FindQuestionService>(FindQuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

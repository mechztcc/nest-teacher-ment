import { Test, TestingModule } from '@nestjs/testing';
import { CreateQuestionService } from './create-question.service';

describe('CreateQuestionService', () => {
  let service: CreateQuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateQuestionService],
    }).compile();

    service = module.get<CreateQuestionService>(CreateQuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

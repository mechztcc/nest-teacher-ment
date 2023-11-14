import { Test, TestingModule } from '@nestjs/testing';
import { AddQuestionService } from './add-question.service';

describe('AddQuestionService', () => {
  let service: AddQuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddQuestionService],
    }).compile();

    service = module.get<AddQuestionService>(AddQuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

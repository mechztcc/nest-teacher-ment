import { Test, TestingModule } from '@nestjs/testing';
import { UpdateQuestionService } from './update-question.service';

describe('UpdateQuestionService', () => {
  let service: UpdateQuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateQuestionService],
    }).compile();

    service = module.get<UpdateQuestionService>(UpdateQuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

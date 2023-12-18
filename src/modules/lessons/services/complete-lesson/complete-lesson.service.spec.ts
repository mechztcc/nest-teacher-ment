import { Test, TestingModule } from '@nestjs/testing';
import { CompleteLessonService } from './complete-lesson.service';

describe('CompleteLessonService', () => {
  let service: CompleteLessonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompleteLessonService],
    }).compile();

    service = module.get<CompleteLessonService>(CompleteLessonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

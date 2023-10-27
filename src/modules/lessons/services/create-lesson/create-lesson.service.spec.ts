import { Test, TestingModule } from '@nestjs/testing';
import { CreateLessonService } from './create-lesson.service';

describe('CreateLessonService', () => {
  let service: CreateLessonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateLessonService],
    }).compile();

    service = module.get<CreateLessonService>(CreateLessonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

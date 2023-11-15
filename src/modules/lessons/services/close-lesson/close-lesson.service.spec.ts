import { Test, TestingModule } from '@nestjs/testing';
import { CloseLessonService } from './close-lesson.service';

describe('CloseLessonService', () => {
  let service: CloseLessonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloseLessonService],
    }).compile();

    service = module.get<CloseLessonService>(CloseLessonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UpdateLessonService } from './update-lesson.service';

describe('UpdateLessonService', () => {
  let service: UpdateLessonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateLessonService],
    }).compile();

    service = module.get<UpdateLessonService>(UpdateLessonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { OpenLessonService } from './open-lesson.service';

describe('OpenLessonService', () => {
  let service: OpenLessonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenLessonService],
    }).compile();

    service = module.get<OpenLessonService>(OpenLessonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

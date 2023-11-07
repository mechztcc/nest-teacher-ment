import { Test, TestingModule } from '@nestjs/testing';
import { IndexLessonsService } from './index-lessons.service';

describe('IndexLessonsService', () => {
  let service: IndexLessonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndexLessonsService],
    }).compile();

    service = module.get<IndexLessonsService>(IndexLessonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

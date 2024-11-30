import { Test, TestingModule } from '@nestjs/testing';
import { PostcommentsService } from './postcomments.service';

describe('PostcommentsService', () => {
  let service: PostcommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostcommentsService],
    }).compile();

    service = module.get<PostcommentsService>(PostcommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

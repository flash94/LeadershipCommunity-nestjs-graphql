import { Test, TestingModule } from '@nestjs/testing';
import { PostcommentsResolver } from './postcomments.resolver';
import { PostcommentsService } from './postcomments.service';

describe('PostcommentsResolver', () => {
  let resolver: PostcommentsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostcommentsResolver, PostcommentsService],
    }).compile();

    resolver = module.get<PostcommentsResolver>(PostcommentsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

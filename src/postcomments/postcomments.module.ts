import { Module } from '@nestjs/common';
import { PostcommentsService } from './postcomments.service';
import { PostcommentsResolver } from './postcomments.resolver';

@Module({
  providers: [PostcommentsResolver, PostcommentsService],
})
export class PostcommentsModule {}

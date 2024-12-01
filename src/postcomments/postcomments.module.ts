import { Module } from '@nestjs/common';
import { PostcommentsService } from './postcomments.service';
import { PostcommentsResolver } from './postcomments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postcomment } from './entities/postcomment.entity';
import { PostsModule } from 'src/posts/posts.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Postcomment]),
    PostsModule,
    UsersModule
],
  providers: [PostcommentsResolver, PostcommentsService],
})
export class PostcommentsModule {}

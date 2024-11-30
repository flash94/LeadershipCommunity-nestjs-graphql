import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostcommentsService } from './postcomments.service';
import { Postcomment } from './entities/postcomment.entity';
import { CreatePostcommentInput } from './dto/create-postcomment.input';
import { UpdatePostcommentInput } from './dto/update-postcomment.input';

@Resolver(() => Postcomment)
export class PostcommentsResolver {
  constructor(private readonly postcommentsService: PostcommentsService) {}

  @Mutation(() => Postcomment)
  createPostcomment(@Args('createPostcommentInput') createPostcommentInput: CreatePostcommentInput) {
    return this.postcommentsService.create(createPostcommentInput);
  }

  @Query(() => [Postcomment], { name: 'postcomments' })
  findAll() {
    return this.postcommentsService.findAll();
  }

  @Query(() => Postcomment, { name: 'postcomment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.postcommentsService.findOne(id);
  }

  @Mutation(() => Postcomment)
  updatePostcomment(@Args('updatePostcommentInput') updatePostcommentInput: UpdatePostcommentInput) {
    return this.postcommentsService.update(updatePostcommentInput.id, updatePostcommentInput);
  }

  @Mutation(() => Postcomment)
  removePostcomment(@Args('id', { type: () => Int }) id: number) {
    return this.postcommentsService.remove(id);
  }
}

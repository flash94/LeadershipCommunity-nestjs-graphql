import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { PostcommentsService } from './postcomments.service';
import { Postcomment } from './entities/postcomment.entity';
import { CreatePostcommentInput } from './dto/create-postcomment.input';
import { UpdatePostcommentInput } from './dto/update-postcomment.input';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PostsService } from 'src/posts/posts.service';

@Resolver(() => Postcomment)
export class PostcommentsResolver {
  constructor(
    private readonly postcommentsService: PostcommentsService, 
    private readonly postService: PostsService,) {}

  @Query(() => [Postcomment], { name: 'commentsByPost' })
  getCommentsByPost(@Args('postId', { type: () => String }) postId: string) {
    return this.postcommentsService.getCommentsByPost(postId);
  }
  
  @Query(() => Postcomment)
  getSingleCommentById(@Args('id', { type: () => String }) id: string) {
    return this.postcommentsService.getCommentById(id);
  }

  @Mutation(() => Postcomment)
  @UseGuards(JwtAuthGuard)
  async createPostComment(
    @Args('createPostCommentInput') createPostCommentInput: CreatePostcommentInput,
    @Context() context: any,
  ): Promise<Postcomment> {
    const userId = context.req.user.userId;;
    // Create a comment with the logged-in user's ID
    return await this.postcommentsService.createComment({
      ...createPostCommentInput,
      authorId: userId,
    });
  }


  @Mutation(() => Postcomment)
  @UseGuards(JwtAuthGuard)
  async updatePostComment(
    @Args('updatePostCommentInput') updatePostCommentInput: UpdatePostcommentInput,
    @Context() context: any,
  ): Promise<Postcomment> {
    const userId = context.req.user.userId;;
    // Proceed with updating the comment
    return this.postcommentsService.updateComment(updatePostCommentInput.id, updatePostCommentInput, userId);
  }

  @Mutation(() => Postcomment)
  @UseGuards(JwtAuthGuard)
  async removePostComment(
    @Args('id') id: string,
    @Context() context: any,
  ){
    const userId = context.req.user.userId;;
    this.postcommentsService.deleteComment(id, userId);
    return `Post Comment with ID ${id} deleted successfully`;
  }
}

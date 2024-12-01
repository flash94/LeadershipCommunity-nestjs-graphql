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
    @Context() context: any, // To get the userId from the JWT context
  ): Promise<Postcomment> {
    const userId = context.req.user.userId;;
    if (!userId) {
      throw new UnauthorizedException('You must be logged in to comment');
    }

    // Check if the post exists
    const post = await this.postService.getPostById(createPostCommentInput.postId);
    if (!post) {
      throw new Error('Post not found');
    }

    // Create a comment with the logged-in user's ID
    return this.postcommentsService.createComment({
      ...createPostCommentInput,
      authorId: userId,
    });
  }


  @Mutation(() => Postcomment)
  @UseGuards(JwtAuthGuard)
  async updatePostComment(
    @Args('updatePostCommentInput') updatePostCommentInput: UpdatePostcommentInput,
    @Context() context: any, // To get the userId from the JWT context
  ): Promise<Postcomment> {
    const userId = context.req.user.userId;;
    if (!userId) {
      throw new UnauthorizedException('You must be logged in to update a comment');
    }

    const postComment = await this.postcommentsService.getCommentById(updatePostCommentInput.id);
    if (!postComment) {
      throw new Error('Comment not found');
    }

    // Check if the logged-in user is the author of the comment
    if (postComment.author.id !== userId) {
      throw new UnauthorizedException('You can only update your own comments');
    }

    // Proceed with updating the comment
    return this.postcommentsService.updateComment(updatePostCommentInput.id, updatePostCommentInput);
  }

  @Mutation(() => Postcomment)
  @UseGuards(JwtAuthGuard)
  async removePostComment(
    @Args('id') id: string,
    @Context() context: any, // To get the userId from the JWT context
  ){
    const userId = context.req.user.userId;;
    if (!userId) {
      throw new UnauthorizedException('You must be logged in to delete a comment');
    }

    const postComment = await this.postcommentsService.getCommentById(id);
    if (!postComment) {
      throw new Error('Comment not found');
    }

    // Check if the logged-in user is the author of the comment
    if (postComment.author.id !== userId) {
      throw new UnauthorizedException('You can only delete your own comments');
    }

    // Proceed with deleting the comment
    this.postcommentsService.deleteComment(id, userId);
    return `Post Comment with ID ${id} deleted successfully`;
  }
}

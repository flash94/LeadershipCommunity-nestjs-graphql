import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { OwnershipGuard } from 'src/auth/guards/ownershipp-auth.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postService: PostsService) {}

  // Fetch all posts
  @Query(() => [Post])
  @UseGuards(JwtAuthGuard)
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  // Fetch a single post by ID
  @Query(() => Post)
  @UseGuards(JwtAuthGuard)
  getPostById(@Args('id', { type: () => String }) id: string) {
    return this.postService.getPostById(id);
  }

  // Create a new post
  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  async createPost(@Args('createPostInput') createPostInput: CreatePostInput, @Context() context : any): Promise<Post> {
    console.log('Context:', context.req.user.userId);
    const userId = context.req.user.userId;
    return this.postService.createPost(createPostInput, userId);
  }

  // Update a post
  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard, OwnershipGuard)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postService.updatePost(updatePostInput);
  }

  // Delete a post
  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard, OwnershipGuard)
  deletePost(@Args('id', { type: () => String }) id: string) {
    this.postService.deletePost(id);
    return `Post with ID ${id} deleted successfully`;
  }
}

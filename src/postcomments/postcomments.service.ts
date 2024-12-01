import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreatePostcommentInput } from './dto/create-postcomment.input';
import { UpdatePostcommentInput } from './dto/update-postcomment.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Postcomment } from './entities/postcomment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { PostsService } from 'src/posts/posts.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostcommentsService {
  constructor(
    @InjectRepository(Postcomment) 
    private readonly postCommentRepository : Repository <Postcomment>,
    private readonly postService: PostsService,
    private readonly userService: UsersService,

  ){}

  async createComment(createPostCommentInput: CreatePostcommentInput): Promise<Postcomment> {
    const post = await this.postService.getPostById(createPostCommentInput.postId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const author = await this.userService.getUserById(createPostCommentInput.authorId);
    if (!author) {
      throw new Error('Author not found');
    }

    const newPostComment = this.postCommentRepository.create({
      ...createPostCommentInput,
      author,
      post
    });
    console.log('postComment', newPostComment)
    const savedComment = this.postCommentRepository.save(newPostComment);
    console.log('saved', savedComment)
    //console.log('saved', savedComment.post.postcomments[0])
    return savedComment;
    //return this.postCommentRepository.save(newPostComment);
  }

  async getCommentsByPost(postId: string): Promise<Postcomment[]> {
    return this.postCommentRepository.find({
      where: { post: { id: postId } },
      relations: ['author', 'post'],
    });
  }

  // Get a single comment by its ID
  async getCommentById(id: string): Promise<Postcomment> {
    const comment = await this.postCommentRepository.findOne({
      where: { id },
      relations: ['author', 'post'],
    });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return comment;
  }

  // Update an existing comment
  async updateComment(id: string, updatePostCommentInput: UpdatePostcommentInput): Promise<Postcomment> {
    const comment = await this.getCommentById(id);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

  // Update comment details
  comment.content = updatePostCommentInput.content || comment.content;
  return this.postCommentRepository.save(comment);
}

  async deleteComment(id: string, userId: string): Promise<boolean> {
    const comment = await this.postCommentRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.author.id !== userId) {
      throw new UnauthorizedException('You can only delete your own comments');
    }

    await this.postCommentRepository.remove(comment);
    return true;
  }
}

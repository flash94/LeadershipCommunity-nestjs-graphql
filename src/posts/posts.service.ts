import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository : Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository : Repository<User>,
  ){}

  async getAllPosts(): Promise<Post[]> {
    return await this.postRepository.find({ relations: ['author', 'postcomments'] });
  }

  async getPostById(id: string): Promise<Post> {
    return await this.postRepository.findOne({
      where: { id },
      relations: ['author', 'postcomments'],
    });
  }

  async createPost(createPostDTO: CreatePostInput, userId: string): Promise<Post> {
     //Find the user by ID
    const author = await this.userRepository.findOne({ where: { id: userId} });
    if (!author) {
      throw new Error('Author not found');
    }
    const post = this.postRepository.create({
      ...createPostDTO,
      author
    });
    return this.postRepository.save(post);
  }

  async updatePost(updatePostDTO: UpdatePostInput): Promise<Post> {
    const { id, ...updateData } = updatePostDTO;
    await this.postRepository.update(id, updateData);
    return this.getPostById(id);
  }

  async deletePost(id: string): Promise<boolean> {
    const result = await this.postRepository.delete(id);
    return result.affected > 0;
  }
}

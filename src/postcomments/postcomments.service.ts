import { Injectable } from '@nestjs/common';
import { CreatePostcommentInput } from './dto/create-postcomment.input';
import { UpdatePostcommentInput } from './dto/update-postcomment.input';

@Injectable()
export class PostcommentsService {
  create(createPostcommentInput: CreatePostcommentInput) {
    return 'This action adds a new postcomment';
  }

  findAll() {
    return `This action returns all postcomments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postcomment`;
  }

  update(id: number, updatePostcommentInput: UpdatePostcommentInput) {
    return `This action updates a #${id} postcomment`;
  }

  remove(id: number) {
    return `This action removes a #${id} postcomment`;
  }
}

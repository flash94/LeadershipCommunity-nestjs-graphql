import { CreatePostcommentInput } from './create-postcomment.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePostcommentInput extends PartialType(CreatePostcommentInput) {
  @Field(() => Int)
  id: number;
}

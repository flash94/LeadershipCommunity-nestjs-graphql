import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class CreatePostcommentInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  content: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  postId: string;


  @Field()
  @IsNotEmpty()
  @IsString()
  authorId: string;
}

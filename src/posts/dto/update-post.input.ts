import { IsOptional, IsString } from 'class-validator';
import { CreatePostInput } from './create-post.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput {
  @IsString()
  @Field()
  id: string;

  @IsString()
  @IsOptional()
  @Field()
  title?: string;

  @IsString()
  @IsOptional()
  @Field()
  content?: string;
}

import { IsOptional, IsString, Length } from 'class-validator';
import { CreatePostcommentInput } from './create-postcomment.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePostcommentInput {
  @IsString()
  @Field()
  id: string;
  
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  content?: string;
}

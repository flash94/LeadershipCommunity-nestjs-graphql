import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

@InputType()
export class CreatePostInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  title: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  content: string;

  // @IsString()
  // @IsNotEmpty()
  // @Field(() => ID)
  // authorId: string;

}

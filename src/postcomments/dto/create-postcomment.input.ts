import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostcommentInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

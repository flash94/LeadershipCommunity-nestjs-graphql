import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({name : "post_comments"})
export class Postcomment {
  @Field((type) => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({nullable: true})
  @Column()
  content: string;

  @Field(() => User) // Relates the comment to its author
  @ManyToOne(() => User, (user) => user.postcomments, {eager:true} )
  author: User;

  @Field(() => Post) // Relates the comment to its post
  @ManyToOne(() => Post, (post) => post.postcomments)
  post: Post;
}

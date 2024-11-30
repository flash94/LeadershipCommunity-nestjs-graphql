import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Postcomment } from 'src/postcomments/entities/postcomment.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'users'})
@ObjectType() // Marks the class as a GraphQL Object Type
export class User {
  @Field((type) => String) // Exposes 'id' in GraphQL schema
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field() // Exposes 'email' in GraphQL schema
  @Column({ unique: true })
  email: string;

  @Field() // Exposes 'username' in GraphQL schema
  @Column({ unique: true })
  username: string;

  @Column() // Password is excluded from the GraphQL schema
  password: string;

  @Field(() => [Post], { nullable: true }) // Exposes the posts relationship in GraphQL
  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @Field(() => [Postcomment], { nullable: true }) // Exposes the comments relationship in GraphQL
  @OneToMany(() => Postcomment, (postComment) => postComment.author)
  postcomments: Postcomment[];
}

import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Postcomment } from 'src/postcomments/entities/postcomment.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({name: 'posts'})
export class Post {
  @Field((type) => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  content: string;

  @Field(() => User) // Relates the post to its author
  @ManyToOne(() => User, (user) => user.posts, { eager: true, nullable: false })
  author: User;

  @Field(()=> [Postcomment], {nullable: true})
  @OneToMany(() => Postcomment, (postcomment) => postcomment.post, {eager: true, cascade: true})
  postcomments: Postcomment[];
}

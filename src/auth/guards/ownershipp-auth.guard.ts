import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class OwnershipGuard implements CanActivate {
    constructor(private readonly postsService: PostsService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const user = ctx.getContext().req.user;
        const args = ctx.getArgs();
        let { id } = args;
        if(!id){
            id = args.updatePostInput?.id;
        }
        console.log("badUser", user)
        console.log("authorId", id)

        //return user.userId === id; // Check if the user owns the resource

        const post = await this.postsService.getPostById(id); // Add a `findOne` method in PostsService
        if (!post) {
        throw new ForbiddenException('Post not found');
        }

        if (post.author.id !== user.userId) {
        throw new ForbiddenException('You are not authorized to perform this action');
        }

        return true;
    }
}
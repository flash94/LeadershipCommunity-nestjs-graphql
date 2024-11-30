import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthLoginResponse } from './dto/auth-login';
import { LoginUserInput } from './dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { User } from 'src/users/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthLoginResponse)
  @UseGuards(GqlAuthGuard)
  login(@Args('loginUserInput') loginUserInput : LoginUserInput, @Context() context){
    return this.authService.login(context.user);
  }

  @Mutation(()=> User)
  createAccount(@Args('createUserInput') createUserData: CreateUserInput){
    console.log("here1")
    return this.authService.register(createUserData);
  }
}

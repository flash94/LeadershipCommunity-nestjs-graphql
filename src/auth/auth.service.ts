import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService : UsersService, private jwtService: JwtService) {

    }

    async register(createUserInput: CreateUserInput): Promise<User> {
        console.log('hhhere')
        const existingUser = await this.usersService.getUserByEmail(createUserInput.email);
        if (existingUser) {
          throw new ConflictException('Email already in use');
        }
    
        const password = await bcrypt.hash(createUserInput.password, 10);
        const newUser = this.usersService.createUser({
            ...createUserInput,
            password,
        })
        return newUser;
      }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.getUserByEmail(email);
        console.log(user)

        if (user || (await bcrypt.compare(password, user.password))) {
            const {password, ...result} = user;
            return result;  
        }
       return null;
    }

    
    async login(user: User){
        //const user = await this.usersService.getUserByEmail(loginUserInput.email); 
        //const {password, ...result} = user;
        return {
            access_token: this.jwtService.sign({
                email: user.email,
                sub: user.id
            }),
            user,
        };

    }
}

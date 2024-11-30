import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ){}

  createUser(createUserData : CreateUserInput){
    const newUser = this.usersRepository.create(createUserData);
    console.log(newUser);
    return this.usersRepository.save(newUser);
  }

  getAllUsers() {
    return this.usersRepository.find();
  }

  getUserByEmail(email: string) {
    return this.usersRepository.findOneBy({email});
  }

  // update(id: string, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }

  removeUserByEmail(email: string) {
    return this.usersRepository.delete([email]);
  }
}

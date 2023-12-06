import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '@prisma/client';
import { UserType } from './user.interface';
import {
  LoginUnauthorizedException,
  UserExistsException,
} from './user.exception';
import * as bcrypt from 'bcrypt';
import { UserValidator } from './user.validator';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userValidator: UserValidator,
  ) {}

  async create(data: UserType): Promise<User> {
    const userExists = await this.userRepository.findByEmail(data.email);

    if (userExists) {
      throw new UserExistsException();
    }

    const hash = await bcrypt.hash(data.password, 10);
    return await this.userRepository.create({ ...data, password: hash });
  }

  async findUserAndValidate(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new LoginUnauthorizedException();
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid || !user) {
      throw new LoginUnauthorizedException();
    }

    return { ...user, password: undefined };
  }

  async findById(id: string) {
    const user = await this.userRepository.findById(id);

    this.userValidator.notFoundCheck(user);

    return user;
  }
}

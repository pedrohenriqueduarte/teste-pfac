import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '@prisma/client';
import { UserType } from './user.interface';
import { UserExistsException } from './user.exception';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: UserType): Promise<User> {
    const userExists = await this.userRepository.findByEmail(data.email);

    if (userExists) {
      throw new UserExistsException();
    }

    const hash = await bcrypt.hash(data.password, 10);

    return await this.userRepository.create({ ...data, password: hash });
  }
}

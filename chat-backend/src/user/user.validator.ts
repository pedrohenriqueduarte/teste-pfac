import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserNotFoundException } from './user.exception';

@Injectable()
export class UserValidator {
  notFoundCheck(user?: User | unknown) {
    if (!user) {
      throw new UserNotFoundException();
    }
  }
}

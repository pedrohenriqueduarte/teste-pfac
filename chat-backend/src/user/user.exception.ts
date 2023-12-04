import { ConflictException } from '@nestjs/common';

export class UserExistsException extends ConflictException {
  constructor() {
    super('Email de usuário já existente.');
  }
}

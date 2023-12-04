import { ConflictException, UnauthorizedException } from '@nestjs/common';

export class UserExistsException extends ConflictException {
  constructor() {
    super('Email de usuário já existente');
  }
}

export class LoginUnauthorizedException extends UnauthorizedException {
  constructor() {
    super('Senha ou Email incorretos');
  }
}

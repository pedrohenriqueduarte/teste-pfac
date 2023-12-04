import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserRepository } from './user.repository';
import { UserValidator } from './user.validator';

@Module({
  controllers: [],
  providers: [UserService, UserRepository, UserValidator],
  imports: [PrismaModule],
  exports: [UserService],
})
export class UserModule {}

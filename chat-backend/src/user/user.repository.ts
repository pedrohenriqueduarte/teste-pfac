import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: Prisma.UserCreateArgs['data'],
    transaction?: Prisma.TransactionClient,
  ): Promise<User> {
    const prisma = transaction || this.prisma;
    return await prisma.user.create({ data });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email } });
  }
}

import { Injectable } from '@nestjs/common';
import { Message, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: Prisma.MessageCreateArgs['data'],
    transaction?: Prisma.TransactionClient,
  ): Promise<Message> {
    const prisma = transaction || this.prisma;
    return await prisma.message.create({ data });
  }

  async findAllChatMessages(): Promise<Message[]> {
    return await this.prisma.message.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  }
}

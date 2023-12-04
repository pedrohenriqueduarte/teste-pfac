import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MessageRepository } from './message.repository';

@Module({
  controllers: [MessageController],
  providers: [MessageService, MessageRepository],
  imports: [PrismaModule],
})
export class MessageModule {}

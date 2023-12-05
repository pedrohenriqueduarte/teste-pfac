import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MessageRepository } from './message.repository';
import { UserModule } from 'src/user/user.module';
import { MessageEventsService } from './message-events.service';
import { MessageGateway } from './message.gateway';

@Module({
  controllers: [MessageController],
  providers: [
    MessageService,
    MessageRepository,
    MessageEventsService,
    MessageGateway,
  ],
  imports: [PrismaModule, UserModule],
})
export class MessageModule {}

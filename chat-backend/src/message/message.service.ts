import { Injectable, Logger } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UserPayload } from 'src/auth/auth.interface';
import { UserService } from 'src/user/user.service';
import { MessageRepository } from './message.repository';
import { Message } from '@prisma/client';
import { MessageGateway } from './message.gateway';

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name);

  constructor(
    private readonly userService: UserService,
    private readonly messageRepository: MessageRepository,
    private readonly messageGateway: MessageGateway,
  ) {}

  async create(createMessageDto: CreateMessageDto, userPayload: UserPayload) {
    try {
      const user = await this.userService.findById(userPayload.userId);

      const data = { text: createMessageDto.text, userId: user.id };
      const message = await this.messageRepository.create(data);

      const newMessage = await this.messageRepository.findById(message.id);

      this.messageGateway.emitMessageChat(newMessage);

      return { message };
    } catch (error) {
      this.logger.error('Create Message Error', error);
      throw error;
    }
  }

  async findAllChatMessages(): Promise<Message[]> {
    return await this.messageRepository.findAllChatMessages();
  }
}

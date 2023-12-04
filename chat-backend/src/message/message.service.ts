import { Injectable, Logger } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UserPayload } from 'src/auth/auth.interface';
import { UserService } from 'src/user/user.service';
import { MessageRepository } from './message.repository';

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name);

  constructor(
    private readonly userService: UserService,
    private readonly messageRepository: MessageRepository,
  ) {}

  async create(createMessageDto: CreateMessageDto, userPayload: UserPayload) {
    try {
      const user = await this.userService.findById(userPayload.userId);

      const data = { text: createMessageDto.text, userId: user.id };
      const message = await this.messageRepository.create(data);

      return { message, name: user.name };
    } catch (error) {
      this.logger.error('Create Message Error', error);
      throw error;
    }
  }

  findAll() {
    return `This action returns all message`;
  }
}

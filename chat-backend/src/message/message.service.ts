import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  create(createMessageDto: CreateMessageDto) {
    return createMessageDto;
  }

  findAll() {
    return `This action returns all message`;
  }
}

import { Controller, Get, Post, Body } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetUserData } from 'src/common/decorators/get-user-id.decorator';
import { UserPayload } from 'src/auth/auth.interface';

@ApiTags('Messages')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(
    @Body() createMessageDto: CreateMessageDto,
    @GetUserData() userPayload: UserPayload,
  ) {
    return this.messageService.create(createMessageDto, userPayload);
  }

  @Get()
  findAll() {
    return this.messageService.findAllChatMessages();
  }
}

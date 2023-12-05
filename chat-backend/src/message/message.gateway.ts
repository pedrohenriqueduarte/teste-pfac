import {
  ConnectedSocket,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageEventsService } from './message-events.service';
import { Message } from '@prisma/client';

@WebSocketGateway({
  namespace: 'messages',
})
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messageEventsService: MessageEventsService) {}

  handleConnection(@ConnectedSocket() client: Socket): Promise<void> {
    return this.messageEventsService.onClientConnect(client);
  }

  handleDisconnect(@ConnectedSocket() client: Socket): Promise<void> {
    return this.messageEventsService.onClientDisconnect(client);
  }

  emitMessageChat(message: Message): void {
    this.server.in('chat').emit('message', message);
  }
}

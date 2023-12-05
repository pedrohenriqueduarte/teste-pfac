import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class MessageEventsService {
  private readonly logger = new Logger(MessageEventsService.name);

  async onClientConnect(client: Socket) {
    try {
      this.logger.debug(
        `Cliente conectado no socket (Socket Client Id: ${client.id})`,
      );

      await this.joinToRoom(client);
    } catch (e) {
      this.logger.warn('Erro na conexão do socket');
      client.disconnect();
    }
  }

  async onClientDisconnect(client: Socket): Promise<void> {
    this.logger.debug(`Client disconnected: ${client.id}`);
  }

  private async joinToRoom(client: Socket) {
    await client.join('chat');
  }
}

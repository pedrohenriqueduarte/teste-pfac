import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { ConfigService } from '@nestjs/config';
import { INestApplicationContext } from '@nestjs/common';

export class SocketIoConfigAdapter extends IoAdapter {
  private readonly configService: ConfigService;

  constructor(appOrHttpServer?: INestApplicationContext | any) {
    super(appOrHttpServer);
    this.configService = appOrHttpServer.get(ConfigService);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const corsOrigin = this.configService.get<string[]>('corsOrigin');

    const server = super.createIOServer(port, {
      ...options,
      transports: ['websocket'],
      cors: {
        origin: corsOrigin,
        credentials: true,
        methods: ['GET', 'POST'],
      },
    });
    return server;
  }
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { SocketIoConfigAdapter } from './common/adapters/socket-io-config.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port') || 3333;

  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('Chat API')
    .setDescription('Documentação da API de chat.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const socketIoConfigAdapter = new SocketIoConfigAdapter(app);
  app.useWebSocketAdapter(socketIoConfigAdapter);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://chat-backend-dxq6akdzl-pedro-henrique-s-projects.vercel.app',
    ],
  });

  app.enableShutdownHooks();
  await app.listen(port, '0.0.0.0');
}
bootstrap();

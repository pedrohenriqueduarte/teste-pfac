import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  const corsLocal = configService.get<string>('CORS_LOCAL');
  const corsDeploy = configService.get<string>('CORS_DEPLOY');

  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('Chat API')
    .setDescription('Documentação da API de chat.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://chat-backend-dxq6akdzl-pedro-henrique-s-projects.vercel.app',
    ],
  });

  app.enableShutdownHooks();
  await app.listen(port);
}
bootstrap();

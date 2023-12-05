import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './auth/guards/access-token.guard';
import { MessageGateway } from './message/message.gateway';
import { MessageEventsService } from './message/message-events.service';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    MessageModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    MessageGateway,
    MessageEventsService,
  ],
})
export class AppModule {}

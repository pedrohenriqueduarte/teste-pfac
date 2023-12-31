import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthJwtHelper } from './auth-jwt.helper';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenStrategy } from './strategies/access-token.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthJwtHelper, AccessTokenStrategy],
  imports: [JwtModule.register({}), ConfigModule, UserModule, PassportModule],
})
export class AuthModule {}

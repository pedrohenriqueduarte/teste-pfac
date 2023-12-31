import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthJwtHelper {
  private readonly logger = new Logger(AuthJwtHelper.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(userId: string, email: string): Promise<string> {
    try {
      const accessToken = await this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
          expiresIn: '1d',
        },
      );

      return accessToken;
    } catch (error) {
      this.logger.error('Generate Error', error);
      throw error;
    }
  }
}

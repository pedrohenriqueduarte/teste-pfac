import { Injectable, Logger } from '@nestjs/common';
import { SignUpAuthDto } from './dto/sign-up.dto';
import { UserService } from 'src/user/user.service';
import { AuthJwtHelper } from './auth-jwt.helper';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtHelper: AuthJwtHelper,
  ) {}

  async create(signUpAuthDto: SignUpAuthDto) {
    try {
      const { email, name, password } = signUpAuthDto;

      const user = await this.userService.create({ email, name, password });

      const accessToken = await this.jwtHelper.generateToken(
        user.id,
        user.email,
      );

      return { accessToken };
    } catch (error) {
      this.logger.error('SignUp Error', error);
      throw error;
    }
  }
}

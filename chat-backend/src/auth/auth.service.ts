import { Injectable, Logger } from '@nestjs/common';
import { SignUpAuthDto } from './dto/sign-up.dto';
import { UserService } from 'src/user/user.service';
import { AuthJwtHelper } from './auth-jwt.helper';
import { SignInAuthDto } from './dto/sign-in.dto';
import { AuthToken } from './auth.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtHelper: AuthJwtHelper,
  ) {}

  async signUp(signUpAuthDto: SignUpAuthDto) {
    try {
      const { email, name, password } = signUpAuthDto;

      const user = await this.userService.create({ email, name, password });

      const accessToken = await this.jwtHelper.generateToken(
        user.id,
        user.email,
      );

      return { accessToken, user: { ...user, password: undefined } };
    } catch (error) {
      this.logger.error('SignUp Error', error);
      throw error;
    }
  }

  async signIn(signInAuthDto: SignInAuthDto): Promise<AuthToken> {
    try {
      const { email, password } = signInAuthDto;
      const user = await this.userService.findUserAndValidate(email, password);

      const accessToken = await this.jwtHelper.generateToken(
        user.id,
        user.email,
      );

      return { accessToken, user: { ...user, password: undefined } };
    } catch (error) {
      this.logger.error('SignIn Error', error);
      throw error;
    }
  }
}

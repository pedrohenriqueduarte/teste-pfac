import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpAuthDto } from './dto/sign-up.dto';
import { SignInAuthDto } from './dto/sign-in.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { AuthToken } from './auth.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-up')
  signUp(@Body() signUpAuthDto: SignUpAuthDto): Promise<AuthToken> {
    return this.authService.signUp(signUpAuthDto);
  }

  @Public()
  @Post('sign-in')
  signIn(@Body() signInAuthDto: SignInAuthDto): Promise<AuthToken> {
    return this.authService.signIn(signInAuthDto);
  }
}

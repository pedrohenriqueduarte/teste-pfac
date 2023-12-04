import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class SignInAuthDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

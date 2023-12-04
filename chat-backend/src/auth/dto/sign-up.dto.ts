import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpAuthDto {
  @ApiProperty({ description: 'Email para cadastro do usuário' })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({ description: 'Nome do usuário' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Senha do usuário' })
  @IsNotEmpty()
  @IsString()
  password: string;
}

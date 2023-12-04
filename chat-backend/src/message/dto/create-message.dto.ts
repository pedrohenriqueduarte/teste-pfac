import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({ description: 'Mensagem enviada no chat.' })
  @MinLength(1)
  @MaxLength(300)
  @IsNotEmpty()
  @IsString()
  text: string;
}

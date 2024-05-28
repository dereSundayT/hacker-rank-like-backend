import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ default: '', description: '' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  email?: string;

  @ApiProperty({ default: '', description: '' })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ default: '', description: '' })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ default: '', description: '' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#=])[A-Za-z\d@$!%*?&#=]+$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number and one of this special character @$!%*?&#=',
    },
  )
  password: string;
}

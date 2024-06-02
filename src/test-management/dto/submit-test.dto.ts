import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SubmitTestDto {
  test_id: number;
  user_id: number;

  @ApiProperty({ description: '' })
  @IsNotEmpty()
  @IsString()
  user_submission: string;

  @ApiProperty({ description: '' })
  @IsNotEmpty()
  @IsString()
  token: string;
}

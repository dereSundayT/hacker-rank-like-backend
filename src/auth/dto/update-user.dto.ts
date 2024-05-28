import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsUrl, Matches, MinLength } from "class-validator";

export class UpdateUserDto{
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
  @IsUrl()
  profile_image_url: string;


}
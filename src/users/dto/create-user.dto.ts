import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: "user1",
    description: "Foydalanuvchi ismi ",
  })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    example: "user1@gmail.com",
    description: "Foydalanuvchi pochtasi ",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "Uzbekistan12@0",
    description: "Foydalanuvchi paroli ",
  })
  @IsStrongPassword({ minLength: 6, minUppercase: 0, minSymbols: 0 })
  password: string;

  @ApiProperty({
    example: "user",
    description: "Foydalanuvchi role ",
  })
  @IsString()
  @IsNotEmpty()
  value: string;
}

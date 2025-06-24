import { ApiProperty } from "@nestjs/swagger";

export class SigninUserDto {
  @ApiProperty({
    example: "user1@gmail.com",
    description: "Foydalanuvchi pochtasi ",
  })
  readonly email: string;
  @ApiProperty({
    example: "Uzbekistan12@0",
    description: "Foydalanuvchi paroli ",
  })
  readonly password: string;
}

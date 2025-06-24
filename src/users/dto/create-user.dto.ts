import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    example: "user1",
    description: "Foydalanuvchi ismi ",
  })
  name: string;
  @ApiProperty({
  example: "user1@gmail.com",
    description: "Foydalanuvchi pochtasi ",
  })
  email: string;

  @ApiProperty({
  example: "Uzbekistan12@0",
    description: "Foydalanuvchi paroli ",
  })
  password: string;

  @ApiProperty({
    example: "user",
    description: "Foydalanuvchi role ",
  })
  value: string;
}

import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/models/user.model";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }
  @HttpCode(HttpStatus.OK)
  @Post("signin")
  signin(@Body() createUserDto: CreateUserDto) {
    return this.authService.signin(createUserDto);
  }
}

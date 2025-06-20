import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/models/user.model";
import { SigninUserDto } from "../users/dto/signin-user.dto";
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}
  async signup(createUserDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(
      createUserDto.email
    );

    if (candidate) {
      throw new ConflictException("Bunday foydalanuvchi bor");
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 7);
    createUserDto.password = hashedPassword;

    const newUser = await this.userService.create(createUserDto);

    return newUser;
  }

  private async generateToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      is_active: user.is_active,
      roles: user.roles,
    };
    let token: any;
    try {
      token = this.jwtService.sign(payload);
    } catch (error) {
      console.log(token);
    }
    return { token };
  }

  async signin(signinUserDto: SigninUserDto) {
    const user = await this.userService.getUserByEmail(signinUserDto.email);

    if (!user) {
      throw new UnauthorizedException("Password yoki Email noto'g'ri");
    }

    const validPassword = await bcrypt.compare(
      signinUserDto.password,
      user.password
    );

    if (!validPassword) {
      throw new UnauthorizedException("Password yoki Email noto'g'ri");
    }
    const token = await this.generateToken(user);

    return { message: "User signed in", id: user.id, token };
  }
}

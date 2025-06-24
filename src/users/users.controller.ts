import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AddRoleDto } from "./dto/add-role.dto";
import { ActivateUser } from "./dto/activate.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./models/user.model";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { SelfGuard } from "../common/guards/self.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from "../common/guards/role.guard";

@ApiTags("Foydalanuvchilar")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Foydalanuvchilar qo'shish " })
  @ApiResponse({
    status: 201,
    description: "Foydalanuvchilar qo'shish ",
    type: User,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @ApiOperation({ summary: "Foydalanuvchilar ro'yxati " })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchilar ro'yxati ",
    type: [User],
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: "Foydalanuvchilar  ro'yxati " })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchilar ro'yxati ",
    type: User,
  })
  @UseGuards(JwtAuthGuard, SelfGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: "Foydalanuvchilar yangilash " })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchilar yangilash ",
    type: User,
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: "Foydalanuvchilar o'chirish " })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchilar o'chirish ",
    type: User,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post("add_role")
  async addRole(@Body() addRoleDto: AddRoleDto) {
    return this.usersService.addRole(addRoleDto);
  }
  @ApiOperation({ summary: "Foydalanuvchilar role o'chirish " })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchilar role o'chirish ",
    type: User,
  })
  @Post("/remove-role")
  async removeRole(@Body() addRoleDto: AddRoleDto) {
    return this.usersService.removeRole(addRoleDto);
  }
  @ApiOperation({ summary: "Foydalanuvchilar aktivatsiya qilish " })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchilar aktivatsiya qilish ",
    type: User,
  })
  @Post("/activate")
  async activateUser(@Body() activateUserDto: ActivateUser) {
    return this.usersService.activateUser(activateUserDto);
  }
}

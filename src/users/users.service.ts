import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { RolesService } from "../roles/roles.service";
import { Role } from "../roles/models/role.model";
import { AddRoleDto } from "./dto/add-role.dto";
import { ActivateUser } from "./dto/activate.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private readonly roleService: RolesService
  ) {}
  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const role = await this.roleService.findByRole(createUserDto.value);
    if (!role) {
      // throw new NotFoundException("Bunday role topilmadi")
      throw new HttpException("Bunday role topilmadi", HttpStatus.NOT_FOUND);
    }

    const newUser = await this.userModel.create(createUserDto);
    console.log(newUser);
    await newUser.$set("roles", [role.id]); // * UserRole.ccreate(userId,roleId) saqlaydi
    await newUser.save();

    return newUser;
  }

  findAll() {
    return this.userModel.findAll({
      include: {
        model: Role,
        attributes: ["value"],
        through: { attributes: [] },
      },
    });
  }

  findOne(id: number) {
    return this.userModel.findByPk(id, { attributes: ["id", "name", "email"] });
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({
      where: { email },
      include: {
        model: Role,
        attributes: ["value"],
        through: { attributes: [] },
      },
    });
    return user?.dataValues;
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.userModel.findByPk(addRoleDto.userId);

    if (!user) {
      throw new BadRequestException("Bunday foydalanuvchi mavjud emas");
    }
    const role = await this.roleService.findByRole(addRoleDto.value);
    if (!role) {
      throw new NotFoundException("Bunday role topilmadi");
    }

    await user.$add("roles", role.id);

    const updateUser = await this.userModel.findByPk(addRoleDto.userId, {
      include: { all: true },
    });
    return updateUser;
  }

  async removeRole(addRoleDto: AddRoleDto) {
    const user = await this.userModel.findByPk(addRoleDto.userId);

    if (!user) {
      throw new BadRequestException("Bunday foydalanuvchi mavjud emas");
    }
    const role = await this.roleService.findByRole(addRoleDto.value);
    if (!role) {
      throw new NotFoundException("Bunday role topilmadi");
    }

    await user.$remove("roles", role.id);

    const updateUser = await this.userModel.findByPk(addRoleDto.userId, {
      include: { all: true },
    });
    return updateUser;
  }

  async activateUser(activateUser: ActivateUser) {
    const user = await this.userModel.findByPk(activateUser.userId);

    if (!user) {
      throw new BadRequestException("Foydalanuvchi topilmadi");
    }

    user.is_active = true;
    await user.save();

    return "User Successfully";
  }
}

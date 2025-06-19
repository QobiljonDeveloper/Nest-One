import {
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
    return `This action returns a #${id} user`;
  }

  getUserByEmail(email: string) {
    return this.userModel.findOne({
      where: { email },
      include: {
        model: Role,
        attributes: ["value"],
        through: { attributes: [] },
      },
    });
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

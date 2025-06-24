import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { UserRole } from "./user-role.model";
import { Role } from "../../roles/models/role.model";
import { ApiProperty } from "@nestjs/swagger";

interface IUserCreationAttr {
  name: string;
  email: string;
  password: string;
}

@Table({ tableName: "user", timestamps: false })
export class User extends Model<User, IUserCreationAttr> {
  @ApiProperty({
    example: "1",
    description: "Foydalanuvchi ID ",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "user1",
    description: "Foydalanuvchi ismi ",
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare name: string;

  @ApiProperty({
    example: "user1@gmail.com",
    description: "Foydalanuvchi pochtasi ",
  })
  @Column({
    type: DataType.STRING(50),
    unique: true,
  })
  declare email: string;

  @ApiProperty({
    example: "Uzbekistan12@0",
    description: "Foydalanuvchi paroli ",
  })
  @Column({
    type: DataType.TEXT,
  })
  declare password: string;

  @ApiProperty({
    example: "false",
    description: "Foydalanuvchi aktivligi ",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_active: boolean;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];
}

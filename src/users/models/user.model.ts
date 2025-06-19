import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { UserRole } from "./user-role.model";
import { Role } from "../../roles/models/role.model";

interface IUserCreationAttr {
  name: string;
  email: string;
  password: string;
}

@Table({ tableName: "user", timestamps: false })
export class User extends Model<User, IUserCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING(50),
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.TEXT,
  })
  declare password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_active: boolean;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];
}

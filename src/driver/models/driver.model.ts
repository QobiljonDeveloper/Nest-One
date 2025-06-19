import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { Machine } from "../../machine/models/machine.model";
import { MachineDriver } from "../../machine_driver/models/machine_driver.model";

interface IDriverCreationAttr {
  first_name: string;
  last_name: string;
  phone: string;
  driver_license: string;
}

@Table({ tableName: "drivers", timestamps: false })
export class Driver extends Model<Driver, IDriverCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  declare first_name: string;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  declare last_name: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  declare phone: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare driver_license: string;

  @BelongsToMany(() => Machine, () => MachineDriver)
  machines: Machine[];
}

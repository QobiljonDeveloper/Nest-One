import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Company } from "../../company/models/company.model";
import { Driver } from "../../driver/models/driver.model";
import { MachineDriver } from "../../machine_driver/models/machine_driver.model";

interface IMachineCreationAttr {
  model: string;
  name: string;
  companyId: number;
}

@Table({ tableName: "machines", timestamps: false })
export class Machine extends Model<Machine, IMachineCreationAttr> {
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
  declare model: string;
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare name: string;

  @ForeignKey(() => Company)
  @Column({
    type: DataType.INTEGER,
    onDelete: "CASCADE",
  })
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;

  @BelongsToMany(() => Driver, () => MachineDriver)
  drivers: Driver[];
}

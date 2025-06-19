import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Builder } from "../../builders/models/builder.models";
import { Machine } from "../../machine/models/machine.model";

interface ICompanyCreationAttr {
  name: string;
  phone: string;
  email: string;
  address: string;
}

@Table({ tableName: "company", timestamps: true })
export class Company extends Model<Company, ICompanyCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  declare name: string;

  @Column({
    type: DataType.STRING(15),
  })
  declare phone: string;

  @Column({
    type: DataType.STRING(50),
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
  })
  declare address: string;

  @HasMany(() => Builder)
  builders: Builder[];

  @HasMany(() => Machine)
  machine: Machine[];
}

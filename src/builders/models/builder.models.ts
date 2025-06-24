import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Company } from "../../company/models/company.model";

interface IBuilderCreationAttr {
  full_name: string;
  birth_day: Date;
  salary: number;
  companyId: number;
  image?: string;
}

@Table({ tableName: "builders", timestamps: false })
export class Builder extends Model<Builder, IBuilderCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare full_name: string;
  @Column({
    type: DataType.DATEONLY,
  })
  declare birth_day: Date;

  @Column({
    type: DataType.DECIMAL(15, 2),
  })
  declare salary: number;
  @Column({
    type: DataType.TEXT,
  })
  declare image: string;

  @ForeignKey(() => Company)
  @Column({
    type: DataType.INTEGER,
    onDelete: "CASCADE",
  })
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;
}

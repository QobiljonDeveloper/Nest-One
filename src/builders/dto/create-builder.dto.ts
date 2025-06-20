import { IsNotEmpty, IsString, IsDate, IsNumber } from "class-validator";

export class CreateBuilderDto {
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @IsNotEmpty()
  @IsDate()
  birth_day: Date;

  @IsNotEmpty()
  @IsNumber()
  salary: number;

  @IsNotEmpty()
  @IsNumber()
  companyId: number;
}

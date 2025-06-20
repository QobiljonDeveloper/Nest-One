import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateMachineDto {
  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  companyId: number;
}

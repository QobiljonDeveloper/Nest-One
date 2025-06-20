import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateMachineDriverDto {
  @IsNotEmpty()
  @IsNumber()
  machineId: number;

  @IsNotEmpty()
  @IsNumber()
  driverId: number;
} 

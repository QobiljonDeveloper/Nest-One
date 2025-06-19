import { PartialType } from '@nestjs/mapped-types';
import { CreateMachineDriverDto } from './create-machine_driver.dto';

export class UpdateMachineDriverDto extends PartialType(CreateMachineDriverDto) {}

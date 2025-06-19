  import { Module } from "@nestjs/common";
  import { MachineDriverService } from "./machine_driver.service";
  import { MachineDriverController } from "./machine_driver.controller";
  import { SequelizeModule } from "@nestjs/sequelize";
  import { MachineDriver } from "./models/machine_driver.model";

  @Module({
    imports: [SequelizeModule.forFeature([MachineDriver])],
    controllers: [MachineDriverController],
    providers: [MachineDriverService],
  })
  export class MachineDriverModule {}

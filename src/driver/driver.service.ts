import { Injectable } from "@nestjs/common";
import { CreateDriverDto } from "./dto/create-driver.dto";
import { UpdateDriverDto } from "./dto/update-driver.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Driver } from "./models/driver.model";

@Injectable()
export class DriverService {
  constructor(
    @InjectModel(Driver) private readonly driverModel: typeof Driver
  ) {}
  create(createDriverDto: CreateDriverDto) {
    return this.driverModel.create(createDriverDto);
  }

  findAll() {
    return this.driverModel.findAll({ include: { all: true } });
  }

  findOne(id: number): Promise<Driver | null> {
    return this.driverModel.findByPk(id);
  }

  async update(id: number, updateDriverDto: UpdateDriverDto) {
    const driver = await this.driverModel.update(updateDriverDto, {
      where: { id },
      returning: true,
    });
    return driver[1][0];
  }

  async remove(id: number) {
    const result = await this.driverModel.destroy({ where: { id } });
    if (result > 0) {
      return `${id} - driver o'chirildi`;
    }

    return `${id}- driver kompaniya yo'q`;
  }
}

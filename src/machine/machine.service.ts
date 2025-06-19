import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateMachineDto } from "./dto/create-machine.dto";
import { UpdateMachineDto } from "./dto/update-machine.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Machine } from "./models/machine.model";
import { CompanyService } from "../company/company.service";

@Injectable()
export class MachineService {
  constructor(
    @InjectModel(Machine) private readonly machineModel: typeof Machine,
    private readonly companyService: CompanyService
  ) {}
  async create(createMachineDto: CreateMachineDto) {
    const { companyId } = createMachineDto;

    const company = await this.companyService.getCompanyById(companyId);
    if (!company) {
      throw new BadRequestException("Bunday kompaniya mavjud emas");
    }

    return this.machineModel.create(createMachineDto);
  }

  async findAll() {
    return this.machineModel.findAll({ include: { all: true } });
  }

  findOne(id: number): Promise<Machine | null> {
    return this.machineModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateMachineDto: UpdateMachineDto) {
    const machine = await this.machineModel.update(updateMachineDto, {
      where: { id },
      returning: true,
    });
    console.log(machine);
    return machine[1][0];
  }

  async remove(id: number) {
    const result = await this.machineModel.destroy({ where: { id } });
    if (result > 0) {
      return `${id} - machine o'chirildi`;
    }

    return `${id}- Bunday machine yo'q`;
  }
}

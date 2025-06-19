import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateBuilderDto } from "./dto/create-builder.dto";
import { UpdateBuilderDto } from "./dto/update-builder.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Builder } from "./models/builder.models";
import { Company } from "../company/models/company.model";
import { CompanyService } from "../company/company.service";

@Injectable()
export class BuildersService {
  constructor(
    @InjectModel(Builder) private readonly builderModel: typeof Builder,
    @InjectModel(Company) private readonly companyModel: typeof Company, ///----> 1 - usul
    private readonly companyService: CompanyService
  ) {}
  async create(createBuilderDto: CreateBuilderDto) {
    const { companyId } = createBuilderDto;

    // const company = await this.companyModel.findByPk(companyId); ----> 1 - usul
    const company = await this.companyService.getCompanyById(companyId);

    if (!company) {
      throw new BadRequestException("Bunday kompaniya mavjud emas");
    }

    return this.builderModel.create(createBuilderDto);
  }

  findAll() {
    return this.builderModel.findAll({ include: { all: true } });
  }

  findOne(id: number): Promise<Company | null> {
    return this.companyModel.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateBuilderDto: UpdateBuilderDto) {
    return `This action updates a #${id} builder`;
  }

  remove(id: number) {
    return `This action removes a #${id} builder`;
  }
}

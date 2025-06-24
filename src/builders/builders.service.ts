import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateBuilderDto } from "./dto/create-builder.dto";
import { UpdateBuilderDto } from "./dto/update-builder.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Builder } from "./models/builder.models";
import { Company } from "../company/models/company.model";
import { CompanyService } from "../company/company.service";
import { FilesService } from "../files/files.service";

@Injectable()
export class BuildersService {
  constructor(
    @InjectModel(Builder) private readonly builderModel: typeof Builder,
    @InjectModel(Company) private readonly companyModel: typeof Company, //----> 1 - usul
    private readonly companyService: CompanyService,
    private readonly fileService: FilesService
  ) {}
  async create(createBuilderDto: CreateBuilderDto, image: any) {
    const { companyId } = createBuilderDto;

    // const company = await this.companyModel.findByPk(companyId); ----> 1 - usul
    const company = await this.companyService.getCompanyById(companyId);

    if (!company) {
      throw new BadRequestException("Bunday kompaniya mavjud emas");
    }

    const fileName = await this.fileService.saveFile(image);
    return this.builderModel.create({ ...createBuilderDto, image: fileName });
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

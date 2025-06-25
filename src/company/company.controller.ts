import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
} from "@nestjs/common";
import { CompanyService } from "./company.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { Company } from "./models/company.model";
import { UpdateCompanyDto } from "./dto/update-company.dto";

@Controller("company")
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async createCompany(
    @Body() createCompanyDto: CreateCompanyDto
  ): Promise<Company> {
    return this.companyService.createCompany(createCompanyDto);
  }

  @Get()
  async getAllCompanies(): Promise<Company[]> {
    return this.companyService.getAllCompanies();
  }
  @Get(":id")
  async getCompanyById(@Param("id") id: number) {
    return this.companyService.getCompanyById(id);
  }

  @Delete(":id")
  async deleteCompanyById(@Param("id") id: number): Promise<string> {
    return this.companyService.deleteCompanyById(+id);
  }
  @Patch(":id")
  async updateCompanyById(
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Param("id") id: number
  ) {
    return this.companyService.updateCompanyById(id, updateCompanyDto);
  }

  @Get("by-name/:name")
  async findCompanyByName(@Param("name") name: string) {
    return this.companyService.findCompanyByName(name);
  }
}

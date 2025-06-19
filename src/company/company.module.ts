import { forwardRef, Module } from "@nestjs/common";
import { CompanyController } from "./company.controller";
import { CompanyService } from "./company.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Company } from "./models/company.model";
import { BuildersModule } from "../builders/builders.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Company]),
    forwardRef(() => BuildersModule), // -- o'quv maqsadida
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}

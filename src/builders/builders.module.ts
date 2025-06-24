import { forwardRef, Module } from "@nestjs/common";
import { BuildersService } from "./builders.service";
import { BuildersController } from "./builders.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Builder } from "./models/builder.models";
import { Company } from "../company/models/company.model";
import { CompanyModule } from "../company/company.module";
import { FilesModule } from "../files/files.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Builder, Company]),
    forwardRef(() => CompanyModule), // --o'quv maqsadida
    FilesModule,
  ],
  controllers: [BuildersController],
  providers: [BuildersService],
  exports: [BuildersService],
})
export class BuildersModule {}

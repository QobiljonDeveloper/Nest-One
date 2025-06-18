import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { CompanyModule } from "./company/company.module";
import { Company } from "./company/models/company.model";
import { BuildersModule } from "./builders/builders.module";
import { Builder } from "./builders/models/builder.models";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [Company, Builder],
      autoLoadModels: true,
      logging: false,
      sync: { alter: true },
    }),
    CompanyModule,
    BuildersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

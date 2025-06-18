import { Module } from '@nestjs/common';
import { BuildersService } from './builders.service';
import { BuildersController } from './builders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Builder } from './models/builder.models';

@Module({
  imports:[SequelizeModule.forFeature([Builder])],
  controllers: [BuildersController],
  providers: [BuildersService],
})
export class BuildersModule {}

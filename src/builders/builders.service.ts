import { Injectable } from "@nestjs/common";
import { CreateBuilderDto } from "./dto/create-builder.dto";
import { UpdateBuilderDto } from "./dto/update-builder.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Builder } from "./models/builder.models";

@Injectable()
export class BuildersService {
  constructor(
    @InjectModel(Builder) private readonly builderModel: typeof Builder
  ) {}
  create(createBuilderDto: CreateBuilderDto) {
    return this.builderModel.create(createBuilderDto);
  }

  findAll() {
    return this.builderModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return `This action returns a #${id} builder`;
  }

  update(id: number, updateBuilderDto: UpdateBuilderDto) {
    return `This action updates a #${id} builder`;
  }

  remove(id: number) {
    return `This action removes a #${id} builder`;
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { BuildersService } from "./builders.service";
import { CreateBuilderDto } from "./dto/create-builder.dto";
import { UpdateBuilderDto } from "./dto/update-builder.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("builders")
export class BuildersController {
  constructor(private readonly buildersService: BuildersService) {}

  @Post()
  @UseInterceptors(FileInterceptor("image"))
  create(
    @Body() createBuilderDto: CreateBuilderDto,
    @UploadedFile() image: any
  ) {
    console.log(image);
    return this.buildersService.create(createBuilderDto, image);
  }

  @Get()
  findAll() {
    return this.buildersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.buildersService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateBuilderDto: UpdateBuilderDto) {
    return this.buildersService.update(+id, updateBuilderDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.buildersService.remove(+id);
  }
}

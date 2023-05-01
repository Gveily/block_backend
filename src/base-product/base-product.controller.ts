import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BaseProductService } from './base-product.service';
import { CreateBaseProductDto } from './dto/create-base-product.dto';
import { UpdateBaseProductDto } from './dto/update-base-product.dto';
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Base product')
@Controller('base-product')
export class BaseProductController {
  constructor(private readonly baseProductService: BaseProductService) {}

  @Post()
  create(@Body() createBaseProductDto: CreateBaseProductDto) {
    return this.baseProductService.create(createBaseProductDto);
  }

  @Get()
  findAll() {
    return this.baseProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.baseProductService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBaseProductDto: UpdateBaseProductDto) {
    return this.baseProductService.update(+id, updateBaseProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.baseProductService.remove(+id);
  }
}

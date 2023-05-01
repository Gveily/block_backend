import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBody, ApiQuery, ApiTags } from "@nestjs/swagger";
import { AreaEnum, ProductsEnum } from "../enums";

@ApiTags('Товары')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {
  }

  @ApiQuery({ name: 'Район', enum: AreaEnum, required: true })
  @ApiQuery({ name: 'Товар', enum: ProductsEnum, required: true })
  @ApiQuery({ name: 'Вес', type: String, required: true, description: 'Пример 1г' })
  @ApiQuery({ name: 'Цена', type: String, required: true, description: 'Пример: 40 , цена указывается в zł автоматически' })
  @ApiQuery({ name: 'Фотографии', type: String, required: true, description: 'Указать через ссылки через пробел' })
  @Post()
  create(
    @Query('Район') area: string,
    @Query('Товар') product: string,
    @Query('Вес') weight: string,
    @Query('Цена') price: string,
    @Query('Фотографии') photoUrl: string
  ) {
    return this.productsService.create({ photoUrl, price, weight, areaId: AreaEnum[area] + 1, name: product });
  }

  @ApiQuery({ name: 'areaId', required: true })
  @Get('by-area-id')
  findByAreaId(
    @Query('areaId') areaId: string
  ) {
    return this.productsService.findByAreaId(parseInt(areaId));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBody, ApiQuery, ApiTags } from "@nestjs/swagger";
import { AreaEnum, ProductsEnum } from "./dto/enums";

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
    return this.productsService.create({ photoUrl, price, weight, areaId: AreaEnum[area] + 1, text: product, callback_data: product.toLowerCase() });
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}

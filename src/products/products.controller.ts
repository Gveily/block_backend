import { Controller, Get, Post, Param, Delete, Query, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiBody, ApiQuery, ApiTags } from "@nestjs/swagger";
import { AreaEnum, ProductsEnum } from "../enums";
import { BaseProductService } from "../base-product/base-product.service";
import { AreasService } from "../areas/areas.service";
import { Product } from "../entities/Product";
import { CreateProductDto } from "./dto/create-product.dto";
import { MakePendingPaymentDto } from "./dto/make-pending-payment.dto";

@ApiTags('Товары')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly baseProductService: BaseProductService
  ) {
  }

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto
  ) {
    const product = await this.baseProductService.findOne(+createProductDto.baseProductId);

    return this.productsService.create({ ...createProductDto, baseProductId: product.id, name: product.name });
  }

  @Post('/make-pending-payment')
  async makePendingPayment(
    @Body() makePendingPaymentDto: Array<MakePendingPaymentDto>
  ) {
    return this.productsService.makePendingPayment(makePendingPaymentDto)
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

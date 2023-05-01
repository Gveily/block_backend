import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "../entities/Product";
import { BaseProductModule } from "../base-product/base-product.module";

@Module({
  imports: [TypeOrmModule.forFeature([Product]), BaseProductModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}

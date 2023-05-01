import { Module } from '@nestjs/common';
import { BaseProductService } from './base-product.service';
import { BaseProductController } from './base-product.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseProduct } from "../entities/BaseProduct";

@Module({
  controllers: [BaseProductController],
  providers: [BaseProductService],
  imports: [TypeOrmModule.forFeature([BaseProduct])],
  exports: [BaseProductService]
})
export class BaseProductModule {}

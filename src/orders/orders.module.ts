import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "../entities/Order";

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
  imports: [TypeOrmModule.forFeature([Order])],
})
export class OrdersModule {}

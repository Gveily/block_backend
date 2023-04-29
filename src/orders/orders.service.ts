import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../entities/Product";
import { Repository } from "typeorm";
import { Order } from "../entities/Order";

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>
  ) {
  }


  async create(createOrderDto: CreateOrderDto) {
    return await this.orderRepository.save(
      this.orderRepository.create(createOrderDto)
    )
  }

  findById(id: number) {
    return this.orderRepository.findOneBy({
      id
    })
  }
}

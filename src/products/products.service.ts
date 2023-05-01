import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../entities/Product";
import lodash from 'lodash';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>
  ) {
  }

  create(createProductDto: CreateProductDto) {
    return this.productsRepository.save(
      this.productsRepository.create(createProductDto)
    )
  }

  async findByAreaId(areaId: number) {
    const productsByAreaId = await this.productsRepository.find({
      where: {
        areaId
      },
      select: {
        name: null,
        areaId: null,
        id: null,
        weight: null,
        price: null,
      },
    });

    return productsByAreaId;
  }

  async findOne(id: number) {
    return await this.productsRepository.findOneBy({ id })
  }

  async remove(id: number) {
    return await this.productsRepository.delete(id)
  }
}

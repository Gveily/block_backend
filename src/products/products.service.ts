import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../entities/Product";

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

  findAll() {
    return `This action returns all products`;
  }

  async findByAreaId(areaId: number) {
    return await this.productsRepository.find({
      where: {
        areaId
      }
    })
  }

  async findOne(id: number) {
    return await this.productsRepository.findOneBy({ id })
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${ id } product`;
  }

  async remove(id: number) {
    return await this.productsRepository.delete(id)
  }
}

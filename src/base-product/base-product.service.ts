import { Injectable } from '@nestjs/common';
import { CreateBaseProductDto } from './dto/create-base-product.dto';
import { UpdateBaseProductDto } from './dto/update-base-product.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { BaseProduct } from "../entities/BaseProduct";
import { Repository } from "typeorm";

@Injectable()
export class BaseProductService {
  
  constructor(
    @InjectRepository(BaseProduct)
    private baseProductRepository: Repository<BaseProduct>
  ) {
  }
  
  async create(createBaseProductDto: CreateBaseProductDto) {
    return await this.baseProductRepository.save(
      this.baseProductRepository.create(createBaseProductDto)
    )
  }

  async findAll() {
    return await this.baseProductRepository.find();
  }

  async findOne(id: number) {
    return await this.baseProductRepository.findOneBy({
      id
    })
  }

  update(id: number, updateBaseProductDto: UpdateBaseProductDto) {
    return this.baseProductRepository.update(id, updateBaseProductDto);
  }

  remove(id: number) {
    return `This action removes a #${id} baseProduct`;
  }
}

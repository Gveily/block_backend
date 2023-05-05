import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
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

  getProductsWithCounter(products) {
    const mapper = {};
    const multidimensionalGroupedArray = [[]];

    products.forEach(el => {
      if (!(el.baseProductId + el.weight in mapper)) {
        mapper[el.baseProductId + el.weight] = 0;
      }

      if (el.baseProductId + el.weight in mapper) {
        mapper[el.baseProductId + el.weight] += 1;
      }
    });

    for(let prop in mapper) {
      const el = products.find((product) => product.baseProductId + product.weight === prop);

      for (let i = 0; i < parseInt(mapper[prop]); i++) {
        multidimensionalGroupedArray[multidimensionalGroupedArray.length - 1].push(el);
      }

      multidimensionalGroupedArray.push([]);
    }

    multidimensionalGroupedArray.pop();

    return multidimensionalGroupedArray.map(el => {
      const res = {
        ...el[0],
        amount: el.length
      }
      return res;
    });
  }

  async findByAreaId(areaId: number) {
    const productsByAreaId = await this.productsRepository.find({
      where: {
        areaId
      },
      select: {
        areaId: null,
        id: null,
        weight: null,
        price: null,
        baseProductId: null
      },
      relations: ['baseProduct'],
      relationLoadStrategy: 'join',
    });

    return this.getProductsWithCounter(productsByAreaId);
  }

  async findOne(id: number) {
    return await this.productsRepository.findOneBy({ id })
  }

  async remove(id: number) {
    return await this.productsRepository.delete(id)
  }
}

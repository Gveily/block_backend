import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../entities/Product";
import { MakePendingPaymentDto } from "./dto/make-pending-payment.dto";

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

  async makePendingPayment(dto: Array<MakePendingPaymentDto>) {
    let result = [];

    for (const el of dto) {
      const items = await this.productsRepository
        .createQueryBuilder('product')
        .where('product.area_id = :areaId', { areaId: el.areaId })
        .andWhere('product.base_product_id = :baseProductId', { baseProductId: el.baseProductId })
        .andWhere('product.pending_payment = :pendingPayment', {pendingPayment: false})
        .leftJoinAndSelect('product.baseProduct', 'baseProduct')
        .take(el.amountToBuy)
        .getMany()
      result.push(items)
    }

    result = result.flat(1);

    for (const el of result) {
      await this.productsRepository.update({ id: el.id }, { ...el, pendingPayment: true });
    }
    const TEN_MINUTES_IN_MS = 300000;

    setTimeout(async () => {
      for (const el of result) {
        const item = await this.productsRepository.findBy({
          id: el.id
        })

        if (item) {
          await this.productsRepository.update({ id: el.id }, { ...el, pendingPayment: false })
        }
      }
    }, TEN_MINUTES_IN_MS);

    return (result as Array<Product>).map((el) => {
      const { photoUrl, pendingPayment, ...rest } = el
      return rest;
    })
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

    for (let prop in mapper) {
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
        areaId,
        pendingPayment: false
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

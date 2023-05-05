import { Column, Entity, Index, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductsEnum } from "../enums";
import { Product } from "./Product";

@Index('base_product_pkey', ['id'], { unique: true })
@Entity('base_product', { schema: 'public' })
export class BaseProduct {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id'
  })
  id: number;

  @Column({
    name: 'name',
    enum: ProductsEnum
  })
  name: ProductsEnum;

  @Column({
    type: 'character varying',
    name: 'description'
  })
  description: string;

  @Column({
    type: 'character varying',
    name: 'product_photo',
    nullable: true,
    default: 'https://i.ibb.co/q1XZZd0/no-photo.png'
  })
  productPhoto: string;

  @OneToMany(() => Product, (product) => product.baseProduct)
  products: Product[];
}
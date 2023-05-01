import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { ProductsEnum } from "../enums";

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
}
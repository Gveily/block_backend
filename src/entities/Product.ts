import { Column, Entity, Index, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Area } from "./Area";

@Index('product_pkey', ['id'], { unique: true })
@Entity('product', { schema: 'public' })
export class Product {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id'
  })
  id: string;

  @Column({
    type: 'character varying',
    name: 'text'
  })
  text: string;

  @Column({
    type: 'character varying',
    name: 'callback_data'
  })
  callback_data: string;

  @Column({
    type: 'character varying',
    name: 'photo_url',
  })
  photoUrl: string;

  @Column({
    type: 'character varying',
    name: 'price',
  })
  price: string;

  @Column({
    type: 'character varying',
    name: 'weight'
  })
  weight: string

  @Column({
    type: 'integer',
    name: 'area_id'
  })
  areaId: number;

  @ManyToOne(() => Area, (area) => area.id)
  @JoinColumn({name: 'area_id', referencedColumnName: 'id'})
  area: Area;
}
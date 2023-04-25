import { Column, Entity, Index, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { City } from "./City";
import { Product } from "./Product";

@Index('areas_pkey', ['id'], { unique: true })
@Entity('areas', { schema: 'public' })
export class Area {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id'
  })
  id: number

  @Column({
    type: 'character varying',
    name: 'name'
  })
  name: string

  @Column({
    type: 'integer',
    name: 'city_id'
  })
  cityId: number

  @ManyToOne(() => City, (city) => city.id)
  @JoinColumn({ name: 'city_id', referencedColumnName: 'id' })
  city: City;

  @OneToMany(() => Product, (product) => product.area)
  @JoinColumn({name: 'area_id', referencedColumnName: 'id'})
  products: Product[];
}
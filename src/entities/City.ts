import { Column, Entity, Index, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Area } from "./Area";

@Index('cities_pkey', ['id'], { unique: true })
@Entity('cities', { schema: 'public' })
export class City {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id'
  })
  id: number

  @Column({
    type: 'character varying',
    name: 'text'
  })
  text: string

  @Column({
    type: 'character varying',
    name: 'callback_data'
  })
  callback_data: string

  @OneToMany(() => Area, (area) => area.city)
  @JoinColumn({name: 'id', referencedColumnName: 'city_id'})
  areas: Area[]
}
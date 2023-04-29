import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index('orders_pkey', ['id'], { unique: true })
@Entity('orders', { schema: 'public' })
export class Order {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id'
  })
  id: number

  @Column({
    type: 'character varying',
    name: 'names'
  })
  names: string

  @Column({
    type: 'character varying',
    name: 'photo_url'
  })
  photoUrl: string;
}
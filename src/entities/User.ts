import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index('users_pkey', ['id'], { unique: true })
@Entity('users', { schema: 'public' })
export class User {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id'
  })
  id: number

  @Column({
    type: 'character varying',
    name: 'login'
  })
  login: string;

  @Column({
    type: 'character varying',
    name: 'password'
  })
  password: string;

  @Column({
    type: 'boolean',
    name: 'isAdmin'
  })
  isAdmin: boolean;
}
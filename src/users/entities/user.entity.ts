import { Product } from 'src/products/entities/product.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRoleEnum {
  admin = 'ROLE:ADMIN',
  user = 'ROLE:USER',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 50 })
  firstname: string;

  @Column({ length: 50 })
  lastname: string;

  @Column({ length: 30 })
  location: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  role: UserRoleEnum;

  @OneToMany((type) => Product, (product) => product.owner, { nullable: true })
  products: Product[];

  @Column({ default: null })
  sourceimg: string;

  @OneToMany(() => Transaction, (trans) => trans.user, { nullable: true })
  itemsborowed: Product[];
}

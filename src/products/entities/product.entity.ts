import { type } from 'os';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @Column()
  price: number;

  @ManyToOne((type) => User, (user) => user.products, {
    nullable: false,
  })
  owner: User;
  @Column({ default: '' })
  categories: string;

  @Column({ default: true })
  availability: boolean;
  @Column({ default: '' })
  sourceimg: string;

  @OneToMany(() => Transaction, (trans) => trans.product, { nullable: true })
  transactions: Transaction[];
}

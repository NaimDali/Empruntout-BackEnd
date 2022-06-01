import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum TransactionEnum {
  Encours = 'EN_COURS',
  Termine = 'TERMINE',
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.id, { cascade: true })
  user: User;

  @ManyToOne((type) => Product, (prod) => prod.id, { cascade: true })
  product: Product;

  @CreateDateColumn({
    update: false,
  })
  date_creation: Date;

  @Column({ default: null })
  date_fini: Date;

  @Column({ default: TransactionEnum.Encours })
  status: TransactionEnum;
}

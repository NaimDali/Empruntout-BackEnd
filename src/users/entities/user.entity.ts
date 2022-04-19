import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  Long,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  Location: string;

  @Column()
  password: string;

  @OneToMany((type) => Product, (product) => product.owner, { nullable: true })
  products: Product[];
}

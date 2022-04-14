import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ default: 0 })
  numberOfProducts: number;
  @ManyToMany(() => Product)
  products: Product[];
}

import { type } from 'os';
import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  //Add categories for easier search.
  @Column()
  price: number;

  @ManyToOne((type) => User, (user) => user.products, {
    nullable: false,
  })
  owner: User;
  @ManyToMany(() => Category)
  @JoinTable()
  Categories: Category[];

  @Column({ default: true })
  availability: boolean;
  @Column()
  sourceimg: string;
}

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
  Price: number;

  @ManyToOne((type) => User, (user) => user.products, {
    nullable: true, //change this to false in prod
  })
  owner: User;
  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @Column({ default: true })
  availability: boolean;
}

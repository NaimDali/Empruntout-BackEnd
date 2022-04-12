import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  //Add categories for easier search.

  @ManyToOne((type) => User, (user) => user.products, {
    cascade: ['insert', 'update'],
    nullable: false,
    eager: true,
  })
  owner: User;
  @Column({ default: true })
  availability: boolean;
}

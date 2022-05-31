import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  writer: User;
  @Column()
  profile: User;
  @Column()
  content: string;
  @CreateDateColumn()
  written_at: Date;
}

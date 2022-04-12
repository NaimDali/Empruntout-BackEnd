import { User } from 'src/users/entities/user.entity';

export class Product {
  id: number;
  name: string;
  owner: User;
  availability: boolean;
}

import { User } from 'src/users/entities/user.entity';

export class CreateProductDto {
  name: string;
  owner: User; //We need to get the user from the token in the frontend.
  availability: boolean = true;
}

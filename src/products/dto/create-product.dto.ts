import { IsNotEmpty, IsString } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  Price: number;
  //  owner: User; //We need to get the user from the token in the frontend.
  availability: boolean = true;
  Categories: Category[];
  sourceimg: string;
}

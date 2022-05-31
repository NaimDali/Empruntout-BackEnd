import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
  //  owner: User; //We need to get the user from the token in the frontend.
  availability: boolean = true;
  categories: string;
  sourceimg: string;
}

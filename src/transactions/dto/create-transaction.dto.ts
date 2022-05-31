import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateDateColumn } from 'typeorm';
import { TransactionEnum } from '../entities/transaction.entity';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  product: Product;

  date_creation: Date;
  status: TransactionEnum;
}

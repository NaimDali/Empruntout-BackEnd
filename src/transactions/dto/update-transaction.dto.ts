import { PartialType } from '@nestjs/mapped-types';
import { TransactionEnum } from '../entities/transaction.entity';
import { CreateTransactionDto } from './create-transaction.dto';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  status: TransactionEnum;
}

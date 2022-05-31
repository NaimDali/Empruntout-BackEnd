import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { UserDecorator } from '../decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Product } from 'src/products/entities/product.entity';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }
  @Get('owned')
  findTransactionsOwnedByUser(@UserDecorator() user: User) {
    return this.transactionsService.findTransactionsOwnedByUser(user);
  }
  @Get('borow')
  findTransactionsBorowedByUser(@UserDecorator() user: User) {
    return this.transactionsService.findTransactionsBorowedByUser(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
    @UserDecorator() user,
  ) {
    return this.transactionsService.update(+id, updateTransactionDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @UserDecorator() user: User) {
    return this.transactionsService.remove(+id, user);
  }
}

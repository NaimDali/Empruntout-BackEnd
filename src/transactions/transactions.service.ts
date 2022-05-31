import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction, TransactionEnum } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { UserDecorator } from 'src/decorators/user.decorator';
import { Console } from 'console';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}
  async create(
    createtransactiontDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const transaction = this.transactionRepository.create(
      createtransactiontDto,
    );
    //transaction.owner = transaction.product.owner;
    //transaction.user = user;
    transaction.status = TransactionEnum.Encours;
    return this.transactionRepository.save(transaction);
  }

  async findTransactionsOwnedByUser(user: User): Promise<Transaction[]> {
    return await this.transactionRepository.find({ owner: user });
  }
  async findTransactionsBorowedByUser(user: User): Promise<Transaction[]> {
    return await this.transactionRepository.find({ user: user });
  }
  findAll() {
    return this.transactionRepository.find();
  }

  findOne(id: number) {
    const trans = this.transactionRepository.findOne(id);
    if (!trans)
      throw new NotFoundException(
        `la transaction avec l'id ${id} n'existe pas.`,
      );
    else return trans;
  }

  async update(
    id: number,
    updatetransactiontDto: UpdateTransactionDto,
    user: User,
  ): Promise<UpdateResult> {
    const trans = await this.transactionRepository.findOne(id);
    if (trans.owner == user)
      return await this.transactionRepository.update(id, updatetransactiontDto);
    else
      throw new UnauthorizedException(
        `Vous n'etes pas autorisé à modifier ce produit.`,
      );
  }

  async remove(id: number, user: User): Promise<DeleteResult> {
    const trans = await this.transactionRepository.findOne(id);
    if (trans.owner == user) return await this.transactionRepository.delete(id);
    else
      throw new UnauthorizedException(
        `Vous n'etes pas autorisé à supprimer ce produit.`,
      );
  }
}

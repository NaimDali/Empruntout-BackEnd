import {
  Inject,
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
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class TransactionsService {
  @Inject(UsersService)
  private readonly userService: UsersService;
  @Inject(ProductsService)
  private readonly productService: ProductsService;
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async create(
    createtransactiontDto: CreateTransactionDto,
    request: any,
  ): Promise<Transaction> {
    var transaction = this.transactionRepository.create(createtransactiontDto);
    transaction.user = request.user;
    transaction.status = TransactionEnum.Encours;
    return await this.transactionRepository.save(transaction);
  }

  /*async findTransactionsOwnedByUser(user: User): Promise<Transaction[]> {
    return await this.transactionRepository.find({ owner: user });
  }*/
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
  async findByUser(id: number) {
    const transactions = await this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.product', 'product')
      .select([
        'transaction',
        'product.name',
        'product.sourceimg',
        'product.availability',
        'product.price',
      ])
      .where('transaction.productId = :productId', { productId: id })
      .andWhere('transaction.productId = product.id')
      .execute();
    /*const transactions = await this.transactionRepository
      .createQueryBuilder('transaction')
      .select()
      .where('transaction.userId = :userId', { userId: id })
      .execute();
    transactions.forEach(async (element) => {
      return (element['transaction_product'] =
        await this.productService.findOneQueryBuilder(
          element['transaction_productId'],
        ));
    });*/
    console.log(transactions);
    return transactions;
  }
  async findProductsByUser(id: number) {
    const user = await this.userService.findOne(id);
    return await this.transactionRepository.find({ user: user });
  }

  /*async update(
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
*/
  async remove(id: number, user: User): Promise<DeleteResult> {
    const trans = await this.transactionRepository.findOne(id);
    if (trans.user == user) return await this.transactionRepository.delete(id);
    else
      throw new UnauthorizedException(
        `Vous n'etes pas autorisé à supprimer ce produit.`,
      );
  }
}

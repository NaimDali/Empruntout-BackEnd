import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserRoleEnum } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

import { UpdateAvatarUserDto } from './dto/update-avatar.dto';

import { RegisterDto } from 'src/auth/dto/register.dto';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly productsService: ProductsService,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
  async create(registerdto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(registerdto);
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);
    user.role = UserRoleEnum.user;
    return await this.usersRepository.save(user);
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }
  async updateAvatar(user: User, file: Express.Multer.File) {
    return await this.usersRepository
      .createQueryBuilder('users')
      .update()
      .set({ sourceimg: file.filename })
      .where('id = :id', { id: user.id })
      .execute();
  }

  async getUserByUserNameOrEmail(
    username: string,
    email: string,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: [{ username }, { email }],
    });
    return user;
  }
  async getProductsByUserId(id: number): Promise<Product[]> {
    const owner = await this.usersRepository.findOne(id);
    return this.productsService.findAllByOwner(owner);
  }
}

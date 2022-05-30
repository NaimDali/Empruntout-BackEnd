import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { User } from 'src/users/entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private categoryService: CategoriesService,
  ) {}
  async create(
    createProductDto: CreateProductDto,
    user: User,
  ): Promise<Product> {
    //Increment number of products corresponding to given category automatically using event handlers.
    const product = this.productRepository.create(createProductDto);
    product.owner = user;
    return await this.productRepository.save(product);
  }
  async findProductsByUser(user: User): Promise<Product[]> {
    return await this.productRepository.find({ owner: user });
  }
  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    const product = this.productRepository.findOne(id);
    if (!product)
      throw new NotFoundException(`Un produit avec l'id ${id} n'existe pas.`);
    else return product;
  }
  async findProductsByCategories(ids: number[]): Promise<Product[]> {
    const categories = await this.categoryService.findMany(ids);
    return await this.productRepository.find({ Categories: categories });
    //Handle empty array on front to show no available products.
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    user: User,
  ): Promise<UpdateResult> {
    const product = await this.productRepository.findOne(id);
    if (product.owner == user)
      return await this.productRepository.update(id, updateProductDto);
    else
      throw new UnauthorizedException(
        `Vous n'etes pas autorisé à modifier ce produit.`,
      );
  }

  async bookProduct(id: number): Promise<boolean> {
    //This method will be called by bookingService to book a product.
    const product = await this.productRepository.findOne(id);
    if (product) {
      if (product.availability) {
        await this.productRepository.update(id, { availability: false });
        return true;
      } else {
        return false;
      }
    }
  }
  async cancelBookProduct(id: number) {
    //Fetch booking by id;
    //delete it from db
    //update product so that availabity is back to true.
  }
  async remove(id: number, user: User): Promise<DeleteResult> {
    const product = await this.productRepository.findOne(id);
    if (product.owner == user) return await this.productRepository.delete(id);
    else
      throw new UnauthorizedException(
        `Vous n'etes pas autorisé à supprimer ce produit.`,
      );
  }
}

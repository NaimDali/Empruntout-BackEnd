import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { ProductsController } from 'src/products/products.controller';
import { Repository, UpdateResult } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }
  async addProduct(id: number, product: Product): Promise<UpdateResult> {
    const category = await this.categoryRepository.findOne(id);
    category.products.push(product);
    category.numberOfProducts++;
    return await this.categoryRepository.update(id, category);
  }
  async removeProduct(id: number, product: Product): Promise<UpdateResult> {
    const category = await this.categoryRepository.findOne(id);
    category.products = category.products.filter(
      (element) => element != product,
    );
    category.numberOfProducts--;
    return await this.categoryRepository.update(id, category);
  }
  findAll() {
    return this.categoryRepository.find();
  }

  findOne(id: number) {
    return this.categoryRepository.findOne(id);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: number) {
    return await this.categoryRepository.delete(id);
  }
}

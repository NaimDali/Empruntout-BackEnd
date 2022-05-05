import { Injectable, NotFoundException } from '@nestjs/common';
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

  //Relation de produit à catégorie.
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

  //Recherche de categories.
  findAll() {
    return this.categoryRepository.find();
  }

  findOne(id: number) {
    return this.categoryRepository.findOne(id);
  }
  findMany(ids: number[]) {
    return this.categoryRepository.findByIds(ids);
  }

  //Recherche de produits dans categories.
  async findProductsByCategoryId(id: number): Promise<Product[]> {
    const category = await this.categoryRepository.findOne(id);
    if (!category)
      throw new NotFoundException("Une catégorie avec cet id n'existe pas.");
    else return category.products;
  }
  //CRUD Catégorie.
  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryRepository.update(id, updateCategoryDto);
  }
  async remove(id: number) {
    return await this.categoryRepository.delete(id);
  }
  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }
}

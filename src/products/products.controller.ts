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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UserDecorator } from '../decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @UserDecorator() user: User,
  ) {
    return this.productsService.create(createProductDto, user);
  }
  @Post('categories')
  getProductsByCatgegories(@Body() ids: number[]) {
    return this.productsService.findProductsByCategories(ids);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(+id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    @UserDecorator() user,
  ) {
    return this.productsService.update(+id, updateProductDto, user);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: number, @UserDecorator() user: User) {
    return this.productsService.remove(+id, user);
  }
}

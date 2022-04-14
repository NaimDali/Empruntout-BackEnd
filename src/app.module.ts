import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [ProductsModule, UsersModule, TypeOrmModule.forRoot(), CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

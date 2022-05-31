import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { CommentsService } from './comments/comments.service';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    TypeOrmModule.forRoot(),
    CategoriesModule,
    AuthModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

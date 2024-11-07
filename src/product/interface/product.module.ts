import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductController } from './product.controller';
import { TokenValidationMiddleware } from 'src/shared/middlewares/tokenValidation';
import { protectedRoutes } from '../constant/routes';
import { CreateProductUseCase } from '../application/createProduct/createProduct.useCase';
import { GetProductsUseCase } from '../application/getProducts/getProducts.useCase';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from '../domain/models/product.entity';
import { JSONWebTokenUtils } from 'src/auth/infrastructure/external/jsonWebtoken';
import { ProductRepositoryImp } from '../domain/repositories/product.repository';
import { GetProductByIdUseCase } from '../application/getProductsById/getProductById.useCase';
import { UpdateProductUseCase } from '../application/updateProduct/updateProduct.useCase';
import { DeleteProductUseCase } from '../application/deleteProduct/deleteProduct.useCase';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [
    JSONWebTokenUtils,
    TokenValidationMiddleware,
    ProductRepositoryImp,
    CreateProductUseCase,
    GetProductsUseCase,
    GetProductByIdUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
  ],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenValidationMiddleware).forRoutes(...protectedRoutes);
  }
}

import { Injectable } from '@nestjs/common';
import { ProductRepositoryImp } from 'src/product/domain/repositories/product.repository';
import { CreateProductRequestDto } from './createProduct.dto';
import { Product } from 'src/product/domain/models/product.entity';

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryImp) {}

  async execute(
    createProductRequestDto: CreateProductRequestDto,
  ): Promise<Product> {
    const result = await this.productRepository.createProduct(
      createProductRequestDto,
    );
    return result;
  }
}

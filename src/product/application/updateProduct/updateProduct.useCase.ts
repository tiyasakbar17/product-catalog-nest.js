import { Injectable } from '@nestjs/common';
import { ProductRepositoryImp } from 'src/product/domain/repositories/product.repository';
import { Product } from 'src/product/domain/models/product.entity';
import { ProductNotFoundException } from 'src/product/exceptions/productNotFound.exception';
import { UpdateProductRequestDto } from './updateProduct.dto';
import { FailedUpdateProductException } from 'src/product/exceptions/failedUpdateProduct.exception';

@Injectable()
export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryImp) {}

  async execute(id: number, params: UpdateProductRequestDto): Promise<Product> {
    const isExist = await this.productRepository.getProductById(id);
    if (!isExist) {
      throw new ProductNotFoundException();
    }

    const product = await this.productRepository.updateProduct(id, params);

    if (product === 0) {
      throw new FailedUpdateProductException();
    }

    return isExist;
  }
}

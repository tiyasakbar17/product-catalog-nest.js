import { Injectable } from '@nestjs/common';
import { ProductRepositoryImp } from 'src/product/domain/repositories/product.repository';
import { Product } from 'src/product/domain/models/product.entity';
import { ProductNotFoundException } from 'src/product/exceptions/productNotFound.exception';
import { FailedDeleteProductException } from 'src/product/exceptions/failedDeleteProduct.exception';

@Injectable()
export class DeleteProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryImp) {}

  async execute(id: number): Promise<Product> {
    const isExist = await this.productRepository.getProductById(id);
    if (!isExist) {
      throw new ProductNotFoundException();
    }

    const product = await this.productRepository.deleteProduct(id);

    if (product === 0) {
      throw new FailedDeleteProductException();
    }

    return isExist;
  }
}

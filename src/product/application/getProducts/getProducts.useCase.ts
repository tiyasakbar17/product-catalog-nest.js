import { Injectable } from '@nestjs/common';
import { ProductRepositoryImp } from 'src/product/domain/repositories/product.repository';
import { IProductWithTotalData } from 'src/product/domain/models/product.entity';
import { GetProductsRequestQueryDto } from './getProducts.dto';

@Injectable()
export class GetProductsUseCase {
  constructor(private readonly productRepository: ProductRepositoryImp) {}

  async execute(
    getProductRequestDto: GetProductsRequestQueryDto,
  ): Promise<IProductWithTotalData> {
    const result =
      await this.productRepository.getProducts(getProductRequestDto);
    return result;
  }
}

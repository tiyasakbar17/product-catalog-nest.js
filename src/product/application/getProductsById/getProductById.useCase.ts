import { Injectable } from '@nestjs/common';
import { ProductRepositoryImp } from 'src/product/domain/repositories/product.repository';
import { Product } from 'src/product/domain/models/product.entity';
import { ProductNotFoundException } from 'src/product/exceptions/productNotFound.exception';
import { ParamByIdRequestDto } from 'src/shared/dtos/request.dto';

@Injectable()
export class GetProductByIdUseCase {
  constructor(private readonly productRepository: ProductRepositoryImp) {}

  async execute(getProductRequestDto: ParamByIdRequestDto): Promise<Product> {
    const result = await this.productRepository.getProductById(
      getProductRequestDto.id,
    );

    if (!result) {
      throw new ProductNotFoundException();
    }
    return result;
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { productRoutes } from '../constant/routes';
import { ResponseDtoUtils } from 'src/shared/utils/response.utils';
import {
  CreateProductRequestDto,
  CreateProductResponseDto,
} from '../application/createProduct/createProduct.dto';
import { CreateProductUseCase } from '../application/createProduct/createProduct.useCase';
import { GetProductsUseCase } from '../application/getProducts/getProducts.useCase';
import { GetProductsRequestQueryDto } from '../application/getProducts/getProducts.dto';
import { Product } from '../domain/models/product.entity';
import { GetProductByIdUseCase } from '../application/getProductsById/getProductById.useCase';
import { ParamByIdRequestDto } from 'src/shared/dtos/request.dto';
import {
  UpdateProductRequestDto,
  UpdateProductResponseDto,
} from '../application/updateProduct/updateProduct.dto';
import { UpdateProductUseCase } from '../application/updateProduct/updateProduct.useCase';
import { DeleteProductUseCase } from '../application/deleteProduct/deleteProduct.useCase';

@Controller()
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductsUseCase: GetProductsUseCase,
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) {}

  @Post(productRoutes.create.path)
  async createProduct(
    @Body() createProductRequestDto: CreateProductRequestDto,
  ): Promise<ResponseDtoUtils> {
    const newProduct = await this.createProductUseCase.execute(
      createProductRequestDto,
    );
    return ResponseDtoUtils.success<CreateProductResponseDto>(
      'Product created successfully',
      {
        id: newProduct.id,
      },
    );
  }

  @Get(productRoutes.get.path)
  async getProducts(
    @Query() getProductsRequestQueryDto: GetProductsRequestQueryDto,
  ): Promise<ResponseDtoUtils> {
    const data = await this.getProductsUseCase.execute(
      getProductsRequestQueryDto,
    );

    return ResponseDtoUtils.successWithMeta<Product[]>(
      'Data fetched successfully',
      data.products,
      {
        limit: getProductsRequestQueryDto.limit,
        page: getProductsRequestQueryDto.page,
        total: data.total,
      },
    );
  }

  @Get(productRoutes.getById.path)
  async getProductById(
    @Param() params: ParamByIdRequestDto,
  ): Promise<ResponseDtoUtils> {
    const product = await this.getProductByIdUseCase.execute(params);
    return ResponseDtoUtils.success<Product>(
      'Data successfully fetched',
      product,
    );
  }

  @Patch(productRoutes.update.path)
  async updateProduct(
    @Param() params: ParamByIdRequestDto,
    @Body() updateProductRequestDto: UpdateProductRequestDto,
  ): Promise<ResponseDtoUtils> {
    await this.getProductByIdUseCase.execute(params);
    const updatedProduct = await this.updateProductUseCase.execute(
      params.id,
      updateProductRequestDto,
    );
    return ResponseDtoUtils.success<UpdateProductResponseDto>(
      'Product updated successfully',
      {
        id: updatedProduct.id,
      },
    );
  }

  @Delete(productRoutes.delete.path)
  async deleteProduct(
    @Param() params: ParamByIdRequestDto,
  ): Promise<ResponseDtoUtils> {
    await this.getProductByIdUseCase.execute(params);
    const deletedProduct = await this.deleteProductUseCase.execute(params.id);
    return ResponseDtoUtils.success<UpdateProductResponseDto>(
      'Product deleted successfully',
      {
        id: deletedProduct.id,
      },
    );
  }
}

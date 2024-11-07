import { InjectModel } from '@nestjs/sequelize';
import { IProductWithTotalData, Product } from '../models/product.entity';
import { CreateProductRequestDto } from 'src/product/application/createProduct/createProduct.dto';
import { GetProductsRequestQueryDto } from 'src/product/application/getProducts/getProducts.dto';
import { Op } from 'sequelize';
import { UpdateProductRequestDto } from 'src/product/application/updateProduct/updateProduct.dto';

interface ProductRepository {
  createProduct(params: CreateProductRequestDto): Promise<Product>;
  getProducts(
    query: GetProductsRequestQueryDto,
  ): Promise<IProductWithTotalData>;
  getProductById(id: number): Promise<Product>;
  updateProduct(id: number, params: UpdateProductRequestDto): Promise<number>;
  deleteProduct(id: number): Promise<number>;
}

export class ProductRepositoryImp implements ProductRepository {
  constructor(@InjectModel(Product) private productModel: typeof Product) {}
  async createProduct(params: CreateProductRequestDto) {
    const newProductData: Partial<Product> = {
      name: params.name,
      price: params.price,
      description: params.description,
      quantity: params.quantity,
    };

    const newProduct = await this.productModel.create(newProductData);
    return newProduct;
  }

  async getProducts(query: GetProductsRequestQueryDto) {
    const products = await this.productModel.findAndCountAll({
      where: query.search ? { name: { [Op.iLike]: `%${query.search}%` } } : {},
      offset: (query.page - 1) * query.limit,
      limit: query.limit,
    });

    return {
      products: products.rows,
      total: products.count,
    };
  }

  async getProductById(id: number) {
    const product = await this.productModel.findByPk(id);
    return product;
  }

  async updateProduct(id: number, params: UpdateProductRequestDto) {
    const product = await this.productModel.update(params, { where: { id } });
    return product[0];
  }

  async deleteProduct(id: number) {
    const product = await this.productModel.destroy({ where: { id } });
    return product;
  }
}

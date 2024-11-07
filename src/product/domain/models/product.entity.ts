import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'products', paranoid: true })
export class Product extends Model<Product> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  })
  image?: string;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  price!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  quantity!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updatedAt!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deletedAt?: Date;
}

export interface IProductWithTotalData {
  products: Product[];
  total: number;
}

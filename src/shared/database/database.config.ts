import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { User } from 'src/auth/domain/models/user.entity';
import { Product } from 'src/product/domain/models/product.entity';

export const sequelizeConfig: () => SequelizeModuleOptions = () => ({
  dialect: 'postgres' as Dialect,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: `${process.env.DB_PASSWORD}`,
  database: process.env.DB_NAME,
  models: [User, Product],
  logging: false,
});

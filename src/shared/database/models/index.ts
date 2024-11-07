import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';
import { User } from 'src/auth/domain/models/user.entity';
import { Product } from 'src/product/domain/models/product.entity';

// Configure environment and database settings
const env = process.env.NODE_ENV || 'development';
const config = require('../database.config')[env]; // Update to your config file path

// Initialize Sequelize instance
const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable] as string, config)
  : new Sequelize({
      database: config.database,
      username: config.username,
      password: config.password,
      host: config.host,
      port: config.port,
      dialect: config.dialect as Dialect,
      models: [User, Product], // Add your models here
      logging: false,
    });

// Import models dynamically (optional, if you don't want to import manually)
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== path.basename(__filename) &&
      file.slice(-3) === '.ts' &&
      file.indexOf('.test.ts') === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file)).default;
    if (model) {
      sequelize.addModels([model]);
    }
  });

export { sequelize, Sequelize };

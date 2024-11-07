import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/interface/auth.module';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { sequelizeConfig } from './shared/database/database.config';
import { ProductModule } from './product/interface/product.module';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: async (): Promise<SequelizeModuleOptions> =>
        sequelizeConfig(),
    }),
    AuthModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

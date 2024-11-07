import { RequestMethod } from '@nestjs/common';
import { RouteInfo } from '@nestjs/common/interfaces';

interface IRoutes {
  get: RouteInfo;
  getById: RouteInfo;
  create: RouteInfo;
  update: RouteInfo;
  delete: RouteInfo;
}

export const productRoutes: IRoutes = {
  get: {
    path: 'product',
    method: RequestMethod.GET,
  },
  getById: {
    path: 'product/:id',
    method: RequestMethod.GET,
  },
  create: {
    path: 'product/create',
    method: RequestMethod.POST,
  },
  update: {
    path: 'product/update/:id',
    method: RequestMethod.PATCH,
  },
  delete: {
    path: 'product/delete/:id',
    method: RequestMethod.DELETE,
  },
};

export const protectedRoutes: RouteInfo[] = [
  productRoutes.create,
  productRoutes.update,
  productRoutes.delete,
];

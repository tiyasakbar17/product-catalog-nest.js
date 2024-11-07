import { HttpException, HttpStatus } from '@nestjs/common';

export class FailedDeleteProductException extends HttpException {
  constructor() {
    super('Product failed to delete', HttpStatus.NOT_MODIFIED);
  }
}

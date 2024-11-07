import { HttpException, HttpStatus } from '@nestjs/common';

export class FailedUpdateProductException extends HttpException {
  constructor() {
    super('Product failed to update', HttpStatus.NOT_MODIFIED);
  }
}

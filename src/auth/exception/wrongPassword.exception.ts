import { HttpException, HttpStatus } from '@nestjs/common';

export class WrongPasswordException extends HttpException {
  constructor() {
    super('Login failed, Wrong Password', HttpStatus.BAD_REQUEST);
  }
}

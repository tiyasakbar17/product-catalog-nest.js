import { HttpStatus } from '@nestjs/common';
import { IMetaDataResponse, ResponseDto } from '../dtos/response.dto';

export class ResponseDtoUtils {
  static success<T>(
    message: string,
    data: T,
    _status: number = HttpStatus.OK,
  ): ResponseDto<T> {
    return new ResponseDto<T>('success', message, data);
  }

  static successWithMeta<T>(
    message: string,
    data: T,
    meta: IMetaDataResponse,
    _status: number = HttpStatus.OK,
  ): ResponseDto<T> {
    return new ResponseDto<T>('success', message, data, meta);
  }

  static failed<T>(
    message: string,
    _status: number = HttpStatus.BAD_REQUEST,
  ): ResponseDto<T> {
    return new ResponseDto<T>('failed', message, null);
  }
}

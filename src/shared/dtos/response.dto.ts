export interface IMetaDataResponse {
  total: number;
  page: number;
  limit: number;
}

export class ResponseDto<T> {
  status: 'success' | 'failed';
  message: string;
  data: T;
  meta?: IMetaDataResponse;

  constructor(
    status: 'success' | 'failed',
    message: string,
    data: T,
    meta?: IMetaDataResponse,
  ) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.meta = meta;
  }
}

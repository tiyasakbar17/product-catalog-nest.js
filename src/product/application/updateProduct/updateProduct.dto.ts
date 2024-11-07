import { Type } from 'class-transformer';
import { IsString, IsNumber, Min, IsOptional } from 'class-validator';

export class UpdateProductRequestDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  price: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  quantity: number;
}

export class UpdateProductResponseDto {
  id: number;
}

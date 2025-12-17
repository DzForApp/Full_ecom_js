import { IsString, IsNumber, IsOptional, IsUrl, IsArray, IsUUID, Min, IsBoolean, IsObject } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stockQuantity?: number;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  images?: string[];

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsString()
  vehicleType?: string;

  @IsOptional()
  @IsObject()
  specifications?: Record<string, any>;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}
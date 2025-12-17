import { IsEmail, IsString, MinLength, IsOptional, IsBoolean } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(2)
  nameEn: string;

  @IsString()
  @MinLength(2)
  nameAr: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  role?: UserRole;

  @IsBoolean()
  isActive: boolean;
}
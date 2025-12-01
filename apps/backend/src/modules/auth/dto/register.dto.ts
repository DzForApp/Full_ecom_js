import { IsEmail, IsString, MinLength, IsOptional, IsPhoneNumber } from 'class-validator';
import { UserRole } from 'src/modules/users/entities/user.entity';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(2)
  nameEn: string;  // Nom en anglais/français

  @IsString()
  @MinLength(2)
  nameAr: string;  // Nom en arabe

  @IsOptional()
  @IsPhoneNumber()  // Valider le numéro de téléphone
  phone?: string;

  @IsOptional()
  @IsString()
  role?: UserRole;
}
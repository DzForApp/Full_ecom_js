import { Injectable, BadRequestException, UnauthorizedException, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, plainPassword: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Comparer les mots de passe
    const isPasswordValid = await bcrypt.compare(plainPassword, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Retourner l'utilisateur sans le mot de passe
    const { password, ...result } = user;
    return result;
  }

  async register(registerDto: RegisterDto): Promise<{
    message: string;
    user: {
      id: string;
      email: string;
      nameEn: string;
      nameAr: string;
      role: string;
    };
    access_token: string;
  }> {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    this.logger.debug(`Password hash created`);

    // Créer l'utilisateur
    const userData ={
      email: registerDto.email,
      password: hashedPassword,  // HASHÉ !
      nameEn: registerDto.nameEn,
      nameAr: registerDto.nameAr,
      phone: registerDto.phone,
      role: registerDto.role || UserRole.USER,
    }
    const user = await this.usersService.create(userData);

    // Générer le token JWT
    const payload = { 
      sub: user.id, 
      email: user.email, 
      role: user.role 
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        nameEn: user.name_en,
        nameAr: user.name_ar,
        role: user.role,
      },
      access_token: accessToken,
    };
  }

  async login(loginDto: LoginDto): Promise<{
    message: string;
    user: {
      id: string;
      email: string;
      nameEn: string;
      nameAr: string;
      role: string;
    };
    access_token: string;
  }> {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    const payload = { 
      sub: user.id, 
      email: user.email, 
      role: user.role 
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        nameEn: user.nameEn,
        nameAr: user.nameAr,
        role: user.role,
      },
      access_token: accessToken,
    };
  }
}